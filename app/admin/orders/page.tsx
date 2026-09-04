"use client";
import { useCatalog } from "@/store/catalog";
import { Order } from "@/lib/types";

const STATUSES: Order["status"][] = ["Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useCatalog();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Orders</h1>
      <div className="border border-black/10 bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest opacity-55 border-b border-black/10">
              <th className="p-4">Order ID</th><th className="p-4">Customer</th><th className="p-4">Date</th><th className="p-4">Total</th><th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-black/5">
                <td className="p-4 font-medium">{o.id}</td>
                <td className="p-4">{o.userEmail}</td>
                <td className="p-4">{o.date}</td>
                <td className="p-4">₹{o.total}</td>
                <td className="p-4">
                  <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value as Order["status"])} className="border border-black/20 px-3 py-1.5 text-xs">
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center opacity-55">No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
