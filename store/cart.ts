"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/lib/types";

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string, size: string, color: string) => void;
  setQty: (productId: string, size: string, color: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const items = [...get().items];
        const idx = items.findIndex(
          (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
        );
        if (idx > -1) {
          items[idx] = { ...items[idx], qty: items[idx].qty + item.qty };
        } else {
          items.push(item);
        }
        set({ items });
      },
      remove: (productId, size, color) => {
        set({ items: get().items.filter((i) => !(i.productId === productId && i.size === size && i.color === color)) });
      },
      setQty: (productId, size, color, qty) => {
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.size === size && i.color === color ? { ...i, qty: Math.max(1, qty) } : i
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "luffy-cart" }
  )
);
