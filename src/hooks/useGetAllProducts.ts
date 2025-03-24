// hooks/useGetProducts.ts
import { useQuery } from "@tanstack/react-query";
import { EQueryKeys } from "./useGetProduct";
// import { EQueryKeys } from "@/types/consts";

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

const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    let errorMessage = "Ошибка при загрузке продуктов";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e: unknown) {
      console.log("e", e);
      errorMessage = await response.text();
    }
    throw new Error(errorMessage);
  }
  console.log("response", response);
  return response.json();
};

const useGetAllProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: [EQueryKeys.PRODUCTS_LIST],
    queryFn: fetchAllProducts,
    retry: 2,
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
    meta: {
      errorMessage: "Не удалось загрузить список товаров",
    },
  });
};

export default useGetAllProducts;
