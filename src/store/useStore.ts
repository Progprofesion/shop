// store.ts
import { create } from "zustand";
import { ICartState, Product } from "../types/types";

export const useCartStore = create<ICartState>((set) => ({
  items: {},
  totalItems: 0,
  totalPrice: 0,
  selectedItems: {},

  addItem: (product: Product) =>
    set((state) => {
      const currentQuantity = state.items[product.id]?.quantity || 0;
      return {
        items: {
          ...state.items,
          [product.id]: {
            ...product,
            quantity: currentQuantity + 1,
          },
        },
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      };
    }),

  removeItem: (productId: string) =>
    set((state) => {
      const item = state.items[productId];
      if (!item) return state;

      const newQuantity = item.quantity! - 1;
      const priceImpact = item.price;

      if (newQuantity <= 0) {
        //eslint-disable-next-line
        const { [productId]: _, ...restItems } = state.items;
        return {
          items: restItems,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - priceImpact,
        };
      }

      return {
        items: {
          ...state.items,
          [productId]: { ...item, quantity: newQuantity },
        },
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - priceImpact,
      };
    }),

  removeItemCompletely: (productId: string) =>
    set((state) => {
      const item = state.items[productId];
      if (!item) return state;
      //eslint-disable-next-line
      const { [productId]: _, ...restItems } = state.items;
      return {
        items: restItems,
        totalItems: state.totalItems - item.quantity!,
        totalPrice: state.totalPrice - item.price * item.quantity!,
      };
    }),

  toggleItemSelection: (productId: string) =>
    set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [productId]: !state.selectedItems[productId],
      },
    })),

  updateQuantity: (productId: string, quantity: number) =>
    set((state) => {
      const item = state.items[productId];
      if (!item || quantity < 1) return state;

      const diff = quantity - item.quantity!;
      return {
        items: {
          ...state.items,
          [productId]: { ...item, quantity },
        },
        totalItems: state.totalItems + diff,
        totalPrice: state.totalPrice + item.price * diff,
      };
    }),

  resetSelection: () =>
    set((state) => ({
      selectedItems: Object.keys(state.selectedItems).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      ),
    })),

  clearCart: () =>
    set({
      items: {},
      totalItems: 0,
      totalPrice: 0,
      selectedItems: {},
    }),
}));

// cartSelectors.ts
export const useCartItems = () => useCartStore((state) => state.items);
export const useTotalItems = () => useCartStore((state) => state.totalItems);
export const useTotalPrice = () => useCartStore((state) => state.totalPrice);
export const useSelectedItems = () =>
  useCartStore((state) => state.selectedItems);
export const useIsItemSelected = (productId: string) =>
  useCartStore((state) => !!state.selectedItems[productId]);
