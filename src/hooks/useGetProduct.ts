// types/consts.ts (пример)

export enum EQueryKeys {
  PRODUCT = "product",
  PRODUCTS_LIST = "products_list",
}

// hooks/useGetProduct.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const fetchProduct = async (productId: number): Promise<Product> => {
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );

  if (!response.ok) {
    let errorMessage = "Ошибка запроса";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // Если ответ не в JSON формате
      errorMessage = await response.text();
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

const useGetProduct = (productId: number) => {
  const queryClient = useQueryClient();

  return useQuery<Product, Error>({
    queryKey: [EQueryKeys.PRODUCT, productId],
    queryFn: () => fetchProduct(productId),
    retry: 2, // Количество повторных попыток при ошибках
    staleTime: 60 * 1000, // 1 минута до устаревания данных
    gcTime: 5 * 60 * 1000, // 5 минут хранения в кэше

    // onError: (error) => {
    //   console.error("Ошибка при загрузке продукта:", error.message);
    //   // Можно добавить дополнительную логику обработки ошибок
    // },

    // Оптимизация для предзагрузки данных
    placeholderData: () => {
      const cachedProducts = queryClient.getQueryData<Product[]>([
        EQueryKeys.PRODUCTS_LIST,
      ]);
      return cachedProducts?.find((p) => p.id === productId);
    },
  });
};

export default useGetProduct;
