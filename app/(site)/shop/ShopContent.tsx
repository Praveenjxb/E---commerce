"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCatalog } from "@/store/catalog";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/data";

const SORTS = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Rating",
] as const;

export default function ShopContent() {
  const params = useSearchParams();
  const categoryParam = params.get("category");
  const products = useCatalog((s) => s.products);

  const [category, setCategory] = useState(categoryParam || "All");

  useEffect(() => {
    setCategory(categoryParam || "All");
  }, [categoryParam]);
  const [size, setSize] = useState("All");
  const [color, setColor] = useState("All");
  const [maxPrice, setMaxPrice] = useState(8000);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Featured");

  const allSizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))),
    [products],
  );
  const allColors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors))),
    [products],
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      category === "All" ? true : p.category === category,
    );
    if (size !== "All") list = list.filter((p) => p.sizes.includes(size));
    if (color !== "All") list = list.filter((p) => p.colors.includes(color));
    list = list.filter((p) => p.salePrice <= maxPrice);
    if (sort === "Price: Low to High")
      list = [...list].sort((a, b) => a.salePrice - b.salePrice);
    if (sort === "Price: High to Low")
      list = [...list].sort((a, b) => b.salePrice - a.salePrice);
    if (sort === "Rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, size, color, maxPrice, sort]);

  return (
    <section className="px-[5vw] py-12">
      <h1 className="font-serif text-3xl mb-2">
        Shop {category !== "All" ? category : "All"}
      </h1>
      <p className="text-sm opacity-60 mb-10">{filtered.length} products</p>

      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        {/* filters */}
        <aside className="space-y-8">
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-3">
              Category
            </h4>
            <div className="space-y-2 text-sm">
              {["All", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`block ${category === c ? "font-semibold" : "opacity-60"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-3">
              Size
            </h4>
            <div className="flex flex-wrap gap-2">
              {["All", ...allSizes].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-2.5 py-1 text-xs border ${size === s ? "bg-ink text-paper border-ink" : "border-black/20"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-3">
              Color
            </h4>
            <div className="flex flex-wrap gap-2">
              {["All", ...allColors].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-2.5 py-1 text-xs border ${color === c ? "bg-ink text-paper border-ink" : "border-black/20"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-3">
              Max Price: ₹{maxPrice}
            </h4>
            <input
              type="range"
              min={500}
              max={8000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </aside>

        {/* grid */}
        <div>
          <div className="flex justify-end mb-6">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="text-xs border border-black/20 px-3 py-2"
            >
              {SORTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          {filtered.length === 0 ? (
            <p className="text-sm opacity-60">
              No products match these filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-9">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
