"use client";
import { useCatalog } from "@/store/catalog";
import { CATEGORIES } from "@/lib/data";

export default function AdminAnalyticsPage() {
  const { products, orders } = useCatalog();
  const revenueByCategory = CATEGORIES.map((c) => ({
    category: c,
    revenue: orders.reduce((n, o) => n + o.items.reduce((m, i) => {
      const p = products.find((pp) => pp.id === i.productId);
      return p && p.category === c ? m + p.salePrice * i.qty : m;
    }, 0), 0),
  }));
  const max = Math.max(1, ...revenueByCategory.map((r) => r.revenue));

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Analytics</h1>
      <div className="border border-black/10 bg-white p-6">
        <h3 className="font-serif text-lg mb-6">Revenue by Category</h3>
        <div className="space-y-4">
          {revenueByCategory.map((r) => (
            <div key={r.category}>
              <div className="flex justify-between text-sm mb-1.5"><span>{r.category}</span><span>₹{r.revenue}</span></div>
              <div className="h-2 bg-black/5">
                <div className="h-2 bg-ink" style={{ width: `${(r.revenue / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
