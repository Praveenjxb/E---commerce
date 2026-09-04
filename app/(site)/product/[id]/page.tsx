"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { useCatalog } from "@/store/catalog";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import Placeholder from "@/components/Placeholder";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const products = useCatalog((s) => s.products);
  const product = products.find((p) => p.id === id);

  const addToCart = useCart((s) => s.add);
  const isWished = useWishlist((s) =>
    product ? s.ids.includes(product.id) : false,
  );
  const toggleWish = useWishlist((s) => s.toggle);

  const [size, setSize] = useState(product?.sizes[0] ?? "");
  const [color, setColor] = useState(product?.colors[0] ?? "");
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="px-[5vw] py-20 text-center">
        <p className="mb-4">Product not found.</p>
        <button
          className="underline text-sm"
          onClick={() => router.push("/shop")}
        >
          Back to shop
        </button>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const imageList =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];
  const currentImage = imageList[activeThumb] || product.image;

  return (
    <section className="px-[5vw] py-12">
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* gallery */}
        <div>
          <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-neutral-100">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <Placeholder tone={product.tone} icon="none" />
            )}
          </div>
          {imageList.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {imageList.map((thumbImg, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`relative aspect-[3/4] overflow-hidden bg-neutral-100 transition-all ${activeThumb === i ? "ring-2 ring-ink" : "opacity-75 hover:opacity-100"}`}
                >
                  <Image
                    src={thumbImg}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* details */}
        <div>
          <p className="text-xs uppercase tracking-widest opacity-55 mb-2">
            {product.category} · {product.subcategory}
          </p>
          <h1 className="font-serif text-3xl mb-3">{product.name}</h1>
          <div className="flex items-center gap-1.5 mb-4">
            <Star size={14} fill="#0a0a0a" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-xs opacity-50">
              ({product.stock} in stock)
            </span>
          </div>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="line-through opacity-40 text-sm">
              ₹{product.price}
            </span>
            <span className="text-2xl font-semibold">₹{product.salePrice}</span>
          </div>
          <p className="text-sm leading-relaxed opacity-75 mb-8 max-w-md">
            {product.description}
          </p>

          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-3">
              Size
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3.5 py-2 text-xs border ${size === s ? "bg-ink text-paper border-ink" : "border-black/20"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-3">
              Color
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3.5 py-2 text-xs border ${color === c ? "bg-ink text-paper border-ink" : "border-black/20"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center border border-black/20">
              <button
                className="px-3 py-2"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="px-3 text-sm">{qty}</span>
              <button
                className="px-3 py-2"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                addToCart({ productId: product.id, size, color, qty });
                setAdded(true);
                setTimeout(() => setAdded(false), 1800);
              }}
              className="flex-1 bg-ink text-paper py-3.5 text-xs font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggleWish(product.id)}
              className="w-12 h-12 flex items-center justify-center border border-black/20 flex-shrink-0"
              aria-label="Add to Wishlist"
            >
              <Heart size={16} fill={isWished ? "#0a0a0a" : "none"} />
            </button>
          </div>

          <button
            onClick={() => {
              addToCart({ productId: product.id, size, color, qty });
              router.push("/checkout");
            }}
            className="w-full border-2 border-ink text-ink py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-ink hover:text-paper transition-colors mb-6"
          >
            Buy Now
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="font-serif text-2xl mb-7">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
