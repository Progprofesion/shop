export interface IProduct {
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
}

export interface IProduct {
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
}

export interface IFilterState {
  maxPrice: number;
  maxRating: number;
  priceSort: "asc" | "desc" | null;
  ratingSort: "asc" | "desc" | null;
}
export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}
