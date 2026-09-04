"use client";
import { useCatalog } from "@/store/catalog";
import { USERS } from "@/lib/data";

export default function AdminDashboard() {
  const products = useCatalog((s) => s.products);
  const orders = useCatalog((s) => s.orders);

  const totalRevenue = orders.reduce((n, o) => n + o.total, 0);
  const topProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}` },
    { label: "Total Orders", value: orders.length },
    { label: "Total Products", value: products.length },
    { label: "Total Users", value: USERS.length },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="border border-black/10 bg-white p-5">
            <p className="text-xs uppercase tracking-widest opacity-55 mb-2">{s.label}</p>
            <p className="text-2xl font-serif">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-black/10 bg-white p-6">
          <h3 className="font-serif text-lg mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex justify-between text-sm border-b border-black/5 pb-2.5">
                <span>{o.id}</span>
                <span className="opacity-60">{o.userEmail}</span>
                <span className="font-medium">₹{o.total}</span>
              </div>
            ))}
            {orders.length === 0 && <p className="text-sm opacity-55">No orders yet.</p>}
          </div>
        </div>

        <div className="border border-black/10 bg-white p-6">
          <h3 className="font-serif text-lg mb-4">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((p) => (
              <div key={p.id} className="flex justify-between text-sm border-b border-black/5 pb-2.5">
                <span>{p.name}</span>
                <span className="opacity-60">★ {p.rating}</span>
                <span className="font-medium">₹{p.salePrice}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
