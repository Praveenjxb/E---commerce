"use client";
import Link from "next/link";
import { X } from "lucide-react";
import { useWishlist } from "@/store/wishlist";
import { useCart } from "@/store/cart";
import { useCatalog } from "@/store/catalog";
import Placeholder from "@/components/Placeholder";

export default function WishlistPage() {
  const { ids, remove } = useWishlist();
  const products = useCatalog((s) => s.products);
  const addToCart = useCart((s) => s.add);
  const items = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;

  if (items.length === 0) {
    return (
      <section className="px-[5vw] py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Your wishlist is empty</h1>
        <Link href="/shop" className="text-xs font-semibold tracking-widest uppercase border-b border-ink pb-0.5">Discover Products</Link>
      </section>
    );
  }

  return (
    <section className="px-[5vw] py-12">
      <h1 className="font-serif text-3xl mb-10">Your Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
        {items.map((p) => (
          <div key={p.id} className="relative">
            <button onClick={() => remove(p.id)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center"><X size={14} /></button>
            <Link href={`/product/${p.id}`}>
              <div className="aspect-[3/4] mb-3.5"><Placeholder tone={p.tone} icon="figure" /></div>
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-[11.5px] opacity-55 mb-2">{p.category} · {p.subcategory}</p>
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">₹{p.salePrice}</span>
              <button
                onClick={() => { addToCart({ productId: p.id, size: p.sizes[0], color: p.colors[0], qty: 1 }); remove(p.id); }}
                className="text-[10px] font-semibold tracking-widest uppercase border-b border-ink pb-0.5"
              >
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
