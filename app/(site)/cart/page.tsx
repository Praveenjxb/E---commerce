"use client";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/store/cart";
import { useCatalog } from "@/store/catalog";
import Placeholder from "@/components/Placeholder";

export default function CartPage() {
  const { items, remove, setQty } = useCart();
  const products = useCatalog((s) => s.products);

  const lines = items.map((i) => ({ ...i, product: products.find((p) => p.id === i.productId)! })).filter((l) => l.product);
  const subtotal = lines.reduce((n, l) => n + l.product.salePrice * l.qty, 0);
  const originalTotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0);
  const discount = originalTotal - subtotal;
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + delivery;

  if (lines.length === 0) {
    return (
      <section className="px-[5vw] py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Your cart is empty</h1>
        <Link href="/shop" className="text-xs font-semibold tracking-widest uppercase border-b border-ink pb-0.5">Continue Shopping</Link>
      </section>
    );
  }

  return (
    <section className="px-[5vw] py-12">
      <h1 className="font-serif text-3xl mb-10">Your Cart</h1>
      <div className="grid md:grid-cols-[1fr_320px] gap-12">
        <div className="space-y-7">
          {lines.map((l) => (
            <div key={`${l.productId}-${l.size}-${l.color}`} className="flex gap-5 pb-7 border-b border-black/10">
              <div className="relative w-24 sm:w-28 aspect-[3/4] flex-shrink-0 overflow-hidden bg-neutral-100">
                {l.product.image ? (
                  <Image
                    src={l.product.image}
                    alt={l.product.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <Placeholder tone={l.product.tone} icon="figure" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-sm">{l.product.name}</p>
                    <p className="text-xs opacity-55 mb-3">{l.size} · {l.color}</p>
                  </div>
                  <button onClick={() => remove(l.productId, l.size, l.color)} className="opacity-40 hover:opacity-100 h-fit"><Trash2 size={16} /></button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-black/15">
                    <button className="p-2" onClick={() => setQty(l.productId, l.size, l.color, l.qty - 1)}><Minus size={12} /></button>
                    <span className="text-xs w-7 text-center">{l.qty}</span>
                    <button className="p-2" onClick={() => setQty(l.productId, l.size, l.color, l.qty + 1)}><Plus size={12} /></button>
                  </div>
                  <span className="text-sm font-semibold">₹{l.product.salePrice * l.qty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-black/10 p-6 h-fit">
          <h3 className="font-serif text-xl mb-5">Order Summary</h3>
          <div className="space-y-2.5 text-sm mb-5">
            <div className="flex justify-between"><span className="opacity-60">Subtotal</span><span>₹{originalTotal}</span></div>
            <div className="flex justify-between"><span className="opacity-60">Discount</span><span>−₹{discount}</span></div>
            <div className="flex justify-between"><span className="opacity-60">Delivery</span><span>{delivery === 0 ? "Free" : `₹${delivery}`}</span></div>
          </div>
          <div className="flex justify-between font-semibold text-base border-t border-black/10 pt-4 mb-6">
            <span>Total</span><span>₹{total}</span>
          </div>
          <Link href="/checkout" className="block text-center bg-ink text-paper py-3.5 text-xs font-semibold tracking-widest uppercase">Proceed to Checkout</Link>
        </div>
      </div>
    </section>
  );
}
