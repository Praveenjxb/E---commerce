"use client";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search } from "lucide-react";
import Link from "next/link";
import { useCatalog } from "@/store/catalog";

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const products = useCatalog((s) => s.products);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  }, [query, products]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-24 px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-paper w-full max-w-xl"
            initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-black/10">
              <Search size={16} className="opacity-50" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <button onClick={onClose}><X size={18} /></button>
            </div>
            {results.length > 0 && (
              <div className="max-h-80 overflow-y-auto">
                {results.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`} onClick={onClose} className="flex items-center justify-between px-5 py-3 border-t border-black/5 hover:bg-black/5">
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs opacity-55">{p.category} · {p.subcategory}</p>
                    </div>
                    <span className="text-sm">₹{p.salePrice}</span>
                  </Link>
                ))}
              </div>
            )}
            {query.trim() && results.length === 0 && (
              <p className="px-5 py-6 text-sm opacity-55">No products found for "{query}".</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
