import {create} from "zustand";
import type {Product} from "../types/Product";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  originalPrice?: number;
};

type CartState = {
  items: CartItem[];
  add: (product: Product, hasDiscount?: boolean) => void;
  remove: (id: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (product, hasDiscount) =>
    set((state) => {
      const idx = state.items.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        const updated = [...state.items];
        updated[idx].quantity += 1;
        return {items: updated};
      }
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image || "",
            quantity: 1,
            originalPrice: hasDiscount ? product.price * 1.1 : undefined,
          },
        ],
      };
    }),
  remove: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clear: () => set({items: []}),
}));
