// types.ts
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: Record<string, Product>;
  totalItems: number;
  totalPrice: number;
}

// cartStore.ts
import { create } from "zustand";

export const useCartStore = create<CartState>()((set) => ({
  items: {},
  totalItems: 0,
  totalPrice: 0,

  addItem: (product: Product) =>
    set((state) => ({
      items: {
        ...state.items,
        [product.id]: {
          ...product,
          quantity: (state.items[product.id]?.quantity || 0) + 1,
        },
      },
      totalItems: state.totalItems + 1,
      totalPrice: state.totalPrice + product.price,
    })),

  removeItem: (productId: string) =>
    set((state) => {
      const item = state.items[productId];
      if (!item) return state;

      const newItem = { ...item, quantity: item.quantity - 1 };
      if (newItem.quantity === 0) {
        const newItems = { ...state.items };
        delete newItems[productId];
        return {
          items: newItems,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - item.price,
        };
      }

      return {
        items: { ...state.items, [productId]: newItem },
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - item.price,
      };
    }),

  updateQuantity: (productId: string, quantity: number) =>
    set((state) => {
      const item = state.items[productId];
      if (!item) return state;

      const diff = quantity - item.quantity;
      return {
        items: {
          ...state.items,
          [productId]: { ...item, quantity },
        },
        totalItems: state.totalItems + diff,
        totalPrice: state.totalPrice + item.price * diff,
      };
    }),

  clearCart: () =>
    set({
      items: {},
      totalItems: 0,
      totalPrice: 0,
    }),
}));

// cartSelectors.ts
export const useCartItems = () => useCartStore((state) => state.items);

export const useTotalItems = () => useCartStore((state) => state.totalItems);

export const useTotalPrice = () => useCartStore((state) => state.totalPrice);
