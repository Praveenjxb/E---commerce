"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  ids: string[];
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        const ids = get().ids.includes(productId)
          ? get().ids.filter((id) => id !== productId)
          : [...get().ids, productId];
        set({ ids });
      },
      remove: (productId) => set({ ids: get().ids.filter((id) => id !== productId) }),
    }),
    { name: "luffy-wishlist" }
  )
);
