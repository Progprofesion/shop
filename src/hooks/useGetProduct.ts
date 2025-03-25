// types/consts.ts (пример)

export enum EQueryKeys {
  PRODUCT = "product",
  PRODUCTS_LIST = "products_list",
}

// hooks/useGetProduct.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "../types/types";

const fetchProduct = async (productId: number): Promise<Product> => {
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );

  if (!response.ok) {
    let errorMessage = "Ошибка запроса";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      //eslint-disable-next-line
    } catch (e: unknown) {
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

    // Оптимизация для предзагрузки данных
    placeholderData: () => {
      const cachedProducts = queryClient.getQueryData<Product[]>([
        EQueryKeys.PRODUCTS_LIST,
      ]);
      return cachedProducts?.find((p) => +p.id === productId);
    },
  });
};

export default useGetProduct;
