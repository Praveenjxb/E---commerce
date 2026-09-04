"use client";
import { CATEGORIES } from "@/lib/data";
import { useCatalog } from "@/store/catalog";

export default function AdminCategoriesPage() {
  const products = useCatalog((s) => s.products);

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Categories</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {CATEGORIES.map((c) => (
          <div key={c} className="border border-black/10 bg-white p-6">
            <p className="text-xs uppercase tracking-widest opacity-55 mb-2">{c}</p>
            <p className="text-2xl font-serif">{products.filter((p) => p.category === c).length}</p>
            <p className="text-xs opacity-50 mt-1">products listed</p>
          </div>
        ))}
      </div>
    </div>
  );
}
