"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/store/auth";
import { useCatalog } from "@/store/catalog";
import { useWishlist } from "@/store/wishlist";

const STATUS_STYLES: Record<string, string> = {
  Processing: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const orders = useCatalog((s) => s.orders).filter((o) => o.userEmail === currentUser?.email);
  const wishCount = useWishlist((s) => s.ids.length);

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser, router]);

  if (!currentUser) return null;

  return (
    <section className="px-[5vw] py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl mb-1">Hi, {currentUser.name}</h1>
          <p className="text-sm opacity-60">{currentUser.email}</p>
        </div>
        <button onClick={() => { logout(); router.push("/"); }} className="text-xs font-semibold tracking-widest uppercase border-b border-ink pb-0.5">Logout</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="border border-black/10 p-6">
          <p className="text-xs uppercase tracking-widest opacity-55 mb-2">Orders</p>
          <p className="text-2xl font-serif">{orders.length}</p>
        </div>
        <div className="border border-black/10 p-6">
          <p className="text-xs uppercase tracking-widest opacity-55 mb-2">Wishlist</p>
          <p className="text-2xl font-serif">{wishCount}</p>
          <Link href="/wishlist" className="text-[11px] font-semibold tracking-widest uppercase border-b border-ink pb-0.5 mt-2 inline-block">View</Link>
        </div>
        <div className="border border-black/10 p-6">
          <p className="text-xs uppercase tracking-widest opacity-55 mb-2">Saved Address</p>
          <p className="text-sm">{orders[0]?.address || "No address saved yet"}</p>
        </div>
      </div>

      <h2 className="font-serif text-2xl mb-5">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-sm opacity-60">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="border border-black/10 p-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-sm">{o.id}</p>
                <p className="text-xs opacity-55">{o.date} · {o.items.reduce((n, i) => n + i.qty, 0)} items</p>
              </div>
              <span className={`text-[11px] px-3 py-1 rounded-full font-medium ${STATUS_STYLES[o.status]}`}>{o.status}</span>
              <p className="text-sm font-semibold">₹{o.total}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
