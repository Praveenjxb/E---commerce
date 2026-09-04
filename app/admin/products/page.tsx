"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useCatalog } from "@/store/catalog";
import { Product } from "@/lib/types";
import { CATEGORIES } from "@/lib/data";

const empty: Product = {
  id: "", name: "", category: "Men", subcategory: "", price: 0, salePrice: 0,
  rating: 4.5, sizes: ["S", "M", "L"], colors: ["Black"], description: "", stock: 10, tone: "dark",
};

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useCatalog();
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setEditing({ ...empty, id: `p${Date.now()}` }); setIsNew(true); };
  const openEdit = (p: Product) => { setEditing({ ...p }); setIsNew(false); };
  const close = () => setEditing(null);

  const save = () => {
    if (!editing) return;
    if (isNew) addProduct(editing); else updateProduct(editing);
    close();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Products</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-ink text-paper px-5 py-2.5 text-xs font-semibold tracking-widest uppercase">
          <Plus size={14} /> Add Product
        </button>
      </div>

      <div className="border border-black/10 bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest opacity-55 border-b border-black/10">
              <th className="p-4">Name</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4">Rating</th><th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-black/5">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4">{p.category} · {p.subcategory}</td>
                <td className="p-4">₹{p.salePrice} <span className="line-through opacity-40 text-xs">₹{p.price}</span></td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">★ {p.rating}</td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(p)}><Pencil size={15} /></button>
                    <button onClick={() => deleteProduct(p.id)}><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-paper w-full max-w-lg max-h-[90vh] overflow-y-auto p-7">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl">{isNew ? "Add Product" : "Edit Product"}</h3>
              <button onClick={close}><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full border border-black/20 px-4 py-2.5 text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as any })} className="border border-black/20 px-4 py-2.5 text-sm">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <input placeholder="Subcategory" value={editing.subcategory} onChange={(e) => setEditing({ ...editing, subcategory: e.target.value })} className="border border-black/20 px-4 py-2.5 text-sm" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input type="number" placeholder="Price" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} className="border border-black/20 px-4 py-2.5 text-sm" />
                <input type="number" placeholder="Sale Price" value={editing.salePrice} onChange={(e) => setEditing({ ...editing, salePrice: Number(e.target.value) })} className="border border-black/20 px-4 py-2.5 text-sm" />
                <input type="number" placeholder="Stock" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })} className="border border-black/20 px-4 py-2.5 text-sm" />
              </div>
              <input placeholder="Sizes (comma separated)" value={editing.sizes.join(", ")} onChange={(e) => setEditing({ ...editing, sizes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="w-full border border-black/20 px-4 py-2.5 text-sm" />
              <input placeholder="Colors (comma separated)" value={editing.colors.join(", ")} onChange={(e) => setEditing({ ...editing, colors: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="w-full border border-black/20 px-4 py-2.5 text-sm" />
              <textarea placeholder="Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full border border-black/20 px-4 py-2.5 text-sm" />
              <button onClick={save} className="w-full bg-ink text-paper py-3 text-xs font-semibold tracking-widest uppercase mt-2">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
