"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { useCatalog } from "@/store/catalog";
import { useAuth } from "@/store/auth";
import { Order, PaymentMethod } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCart();
  const products = useCatalog((s) => s.products);
  const placeOrder = useCatalog((s) => s.placeOrder);
  const currentUser = useAuth((s) => s.currentUser);

  const [name, setName] = useState(currentUser?.name ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [upiId, setUpiId] = useState("");
  const [placed, setPlaced] = useState<Order | null>(null);

  const lines = items
    .map((i) => ({
      ...i,
      product: products.find((p) => p.id === i.productId)!,
    }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((n, l) => n + l.product.salePrice * l.qty, 0);
  const originalTotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0);
  const discount = originalTotal - subtotal;
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + delivery;
  const isUpiIdValid = /^[\w.-]+@[\w.-]+$/.test(upiId.trim());
  const canPlaceOrder = Boolean(
    name && email && address && (payment !== "upi" || isUpiIdValid),
  );

  const handlePlaceOrder = () => {
    const order: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userEmail: email || "guest@luffy.com",
      items,
      subtotal: originalTotal,
      discount,
      delivery,
      total,
      address,
      paymentMethod: payment,
      ...(payment === "upi" ? { upiId: upiId.trim() } : {}),
      status: "Processing",
      date: new Date().toISOString().slice(0, 10),
    };
    placeOrder(order);
    clear();
    setPlaced(order);
  };

  if (placed) {
    return (
      <section className="px-[5vw] py-24 text-center max-w-lg mx-auto">
        <h1 className="font-serif text-3xl mb-4">Order Confirmed</h1>
        <p className="text-sm opacity-70 mb-2">
          Thank you — your order{" "}
          <span className="font-semibold">{placed.id}</span> has been placed.
        </p>
        <p className="text-sm opacity-70 mb-8">
          A confirmation has been sent to {placed.userEmail}.
        </p>
        <p className="text-sm opacity-70 mb-8">
          Payment:{" "}
          {placed.paymentMethod === "upi"
            ? `UPI (${placed.upiId})`
            : placed.paymentMethod === "cod"
              ? "Cash on Delivery"
              : "Credit / Debit Card"}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push("/shop")}
            className="bg-ink text-paper px-7 py-3 text-xs font-semibold tracking-widest uppercase"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="border border-black/20 px-7 py-3 text-xs font-semibold tracking-widest uppercase"
          >
            View Orders
          </button>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="px-[5vw] py-24 text-center">
        <p className="mb-4">Your cart is empty.</p>
        <button
          className="underline text-sm"
          onClick={() => router.push("/shop")}
        >
          Back to shop
        </button>
      </section>
    );
  }

  return (
    <section className="px-[5vw] py-12">
      <h1 className="font-serif text-3xl mb-10">Checkout</h1>
      <div className="grid md:grid-cols-[1fr_320px] gap-12">
        <div className="space-y-10">
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-4">
              Contact Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="border border-black/20 px-4 py-3 text-sm"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border border-black/20 px-4 py-3 text-sm"
              />
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-4">
              Delivery Address
            </h3>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full address"
              rows={3}
              className="w-full border border-black/20 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-4">
              Payment Method
            </h3>
            <div className="space-y-2">
              {[
                { id: "card", label: "Credit / Debit Card" },
                { id: "upi", label: "UPI" },
                { id: "cod", label: "Cash on Delivery" },
              ].map((m) => (
                <label
                  key={m.id}
                  className="flex items-center gap-3 border border-black/20 px-4 py-3 text-sm cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={payment === m.id}
                    onChange={() => setPayment(m.id as PaymentMethod)}
                  />
                  {m.label}
                </label>
              ))}
            </div>
            {payment === "upi" && (
              <div className="mt-3">
                <input
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID (example@upi)"
                  aria-label="UPI ID"
                  className="w-full border border-black/20 px-4 py-3 text-sm"
                />
                {upiId && !isUpiIdValid && (
                  <p className="text-xs text-red-700 mt-2">
                    Enter a valid UPI ID, such as name@bank.
                  </p>
                )}
              </div>
            )}
            <p className="text-xs opacity-50 mt-3">
              This is a demo checkout — no real payment is processed.
            </p>
          </div>
        </div>

        <div className="border border-black/10 p-6 h-fit">
          <h3 className="font-serif text-xl mb-5">Order Summary</h3>
          <div className="space-y-2 text-sm mb-5 max-h-48 overflow-y-auto">
            {lines.map((l) => (
              <div
                key={`${l.productId}-${l.size}`}
                className="flex justify-between opacity-75"
              >
                <span>
                  {l.product.name} × {l.qty}
                </span>
                <span>₹{l.product.salePrice * l.qty}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2.5 text-sm mb-5 border-t border-black/10 pt-4">
            <div className="flex justify-between">
              <span className="opacity-60">Subtotal</span>
              <span>₹{originalTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Discount</span>
              <span>−₹{discount}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Delivery</span>
              <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-base border-t border-black/10 pt-4 mb-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button
            disabled={!canPlaceOrder}
            onClick={handlePlaceOrder}
            className="w-full bg-ink text-paper py-3.5 text-xs font-semibold tracking-widest uppercase disabled:opacity-40"
          >
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}
