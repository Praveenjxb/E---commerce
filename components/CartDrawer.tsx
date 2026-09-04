"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { PRODUCTS } from "@/lib/data";
import Placeholder from "./Placeholder";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, remove, setQty } = useCart();

  const lines = items.map((i) => {
    const product = PRODUCTS.find((p) => p.id === i.productId)!;
    return { ...i, product };
  }).filter((l) => l.product);

  const subtotal = lines.reduce((n, l) => n + l.product.salePrice * l.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-paper z-50 flex flex-col"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
              <h3 className="font-serif text-xl">Your Cart ({lines.length})</h3>
              <button onClick={onClose}><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {lines.length === 0 && <p className="text-sm opacity-60">Your cart is empty.</p>}
              {lines.map((l) => (
                <div key={`${l.productId}-${l.size}-${l.color}`} className="flex gap-4">
                  <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-neutral-100">
                    {l.product.image ? (
                      <Image
                        src={l.product.image}
                        alt={l.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <Placeholder tone={l.product.tone} icon="figure" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{l.product.name}</p>
                    <p className="text-xs opacity-55 mb-2">{l.size} · {l.color}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-black/15">
                        <button className="p-1.5" onClick={() => setQty(l.productId, l.size, l.color, l.qty - 1)}><Minus size={12} /></button>
                        <span className="text-xs w-6 text-center">{l.qty}</span>
                        <button className="p-1.5" onClick={() => setQty(l.productId, l.size, l.color, l.qty + 1)}><Plus size={12} /></button>
                      </div>
                      <span className="text-sm font-medium">₹{l.product.salePrice * l.qty}</span>
                    </div>
                  </div>
                  <button onClick={() => remove(l.productId, l.size, l.color)} className="opacity-40 hover:opacity-100"><Trash2 size={15} /></button>
                </div>
              ))}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-black/10 px-6 py-5">
                <div className="flex justify-between text-sm mb-4">
                  <span className="opacity-60">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <Link href="/checkout" onClick={onClose} className="block text-center bg-ink text-paper py-3.5 text-xs font-semibold tracking-widest uppercase">
                  Checkout
                </Link>
                <Link href="/cart" onClick={onClose} className="block text-center text-xs font-semibold tracking-widest uppercase mt-3 border-b border-ink w-fit mx-auto pb-0.5">
                  View Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
