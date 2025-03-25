// types.ts
export interface IProduct {
  id: string;
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

export interface Product extends IProduct {
  name?: string;
  quantity?: number;
  totalPrice?: number;
}

export interface ICartState {
  items: Record<string, Product>;
  totalItems: number;
  totalPrice: number;
  selectedItems: Record<string, boolean>;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  removeItemCompletely: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleItemSelection: (productId: string) => void;
  resetSelection: () => void;
}

export interface IFilterState {
  maxPrice?: number;
  maxRating?: number;
  priceSort: "asc" | "desc" | null;
  ratingSort: "asc" | "desc" | null;
}

export interface Iitem {
  product: {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: { rate: number; count: number };
    title: string;
  };
}
