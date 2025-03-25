import { IFilterState } from "../../../types/types";

export const handlePriceSort = (
  setFilters: React.Dispatch<React.SetStateAction<IFilterState>>
) => {
  setFilters((prev) => ({
    ...prev,
    priceSort: prev.priceSort === "asc" ? "desc" : "asc",
    ratingSort: null,
  }));
};

export const handleRatingSort = (
  setFilters: React.Dispatch<React.SetStateAction<IFilterState>>
) => {
  setFilters((prev) => ({
    ...prev,
    ratingSort: prev.ratingSort === "asc" ? "desc" : "asc",
    priceSort: null,
  }));
};
