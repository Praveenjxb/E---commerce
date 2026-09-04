"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS, SEED_ORDERS } from "@/lib/data";
import { Product, Order } from "@/lib/types";

type CatalogState = {
  products: Product[];
  orders: Order[];
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  placeOrder: (o: Order) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
};

export const useCatalog = create<CatalogState>()(
  persist(
    (set, get) => ({
      products: PRODUCTS,
      orders: SEED_ORDERS,
      addProduct: (p) => set({ products: [p, ...get().products] }),
      updateProduct: (p) => set({ products: get().products.map((x) => (x.id === p.id ? p : x)) }),
      deleteProduct: (id) => set({ products: get().products.filter((x) => x.id !== id) }),
      placeOrder: (o) => set({ orders: [o, ...get().orders] }),
      updateOrderStatus: (id, status) =>
        set({ orders: get().orders.map((o) => (o.id === id ? { ...o, status } : o)) }),
    }),
    {
      name: "luffy-catalog",
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<CatalogState>;
        const products = (persisted.products ?? currentState.products).map((product) => {
          const seedProduct = PRODUCTS.find((seed) => seed.id === product.id);
          if (seedProduct) {
            return {
              ...product,
              image: seedProduct.image || product.image,
              images: seedProduct.images || product.images,
            };
          }
          return product;
        });

        return { ...currentState, ...persisted, products };
      },
    }
  )
);
