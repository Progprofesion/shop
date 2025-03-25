import { useEffect } from "react";
import { IFilterState, Product } from "../types/types";

export const useInitializeFilters = (
  products: Product[],
  setFilters: React.Dispatch<React.SetStateAction<IFilterState>>
) => {
  useEffect(() => {
    if (products.length > 0) {
      const maxPrice = Math.max(...products.map((p) => p.price));
      const maxRating = Math.max(...products.map((p) => p.rating.rate));
      setFilters((prev) => ({
        ...prev,
        maxPrice,
        maxRating,
      }));
    }
  }, [products, setFilters]);
};
