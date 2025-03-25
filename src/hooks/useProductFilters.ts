// hooks/useProductFilters.ts
import { useMemo } from "react";
import { IFilterState, Product } from "../types/types";

export const useProductFilters = (
  products: Product[],
  filters: IFilterState,
  debouncedFilterValue: string
) => {
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.title
          .toLowerCase()
          .includes(debouncedFilterValue.toLowerCase()) &&
        product.price <= filters.maxPrice! &&
        product.rating.rate <= filters.maxRating!
    );
  }, [products, debouncedFilterValue, filters.maxPrice, filters.maxRating]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (filters.priceSort) {
        return filters.priceSort === "asc"
          ? a.price - b.price
          : b.price - a.price;
      }
      if (filters.ratingSort) {
        return filters.ratingSort === "asc"
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate;
      }
      return 0;
    });
  }, [filteredProducts, filters.priceSort, filters.ratingSort]);

  return { sortedProducts };
};
