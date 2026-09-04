"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { useWishlist } from "@/store/wishlist";
import { useCart } from "@/store/cart";
import Placeholder from "./Placeholder";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const isWished = useWishlist((s) => s.ids.includes(product.id));
  const toggleWish = useWishlist((s) => s.toggle);
  const addToCart = useCart((s) => s.add);

  return (
    <div className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden mb-3.5">
        <Link href={`/product/${product.id}`}>
          <div className="relative w-full h-full bg-neutral-100 transition-transform duration-700 group-hover:scale-105">
            {product.image ? (
              <Image
                src={product.image as string}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            ) : (
              <Placeholder tone={product.tone} icon="none" />
            )}
          </div>
        </Link>
        <button
          onClick={() => toggleWish(product.id)}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center"
          aria-label="Wishlist"
        >
          <Heart
            size={14}
            fill={isWished ? "#0a0a0a" : "none"}
            className={isWished ? "scale-110" : ""}
          />
        </button>
        <div className="absolute left-2 right-2 bottom-[-50px] group-hover:bottom-2 transition-[bottom] duration-300 flex gap-1.5 z-10">
          <button
            onClick={() =>
              addToCart({
                productId: product.id,
                size: product.sizes[0],
                color: product.colors[0],
                qty: 1,
              })
            }
            className="flex-1 bg-ink text-paper py-2.5 text-[10px] font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity text-center truncate"
          >
            Quick Add
          </button>
          <Link
            href="/checkout"
            onClick={() =>
              addToCart({
                productId: product.id,
                size: product.sizes[0],
                color: product.colors[0],
                qty: 1,
              })
            }
            className="flex-1 bg-paper text-ink border border-ink py-2.5 text-[10px] font-semibold tracking-wider uppercase hover:bg-ink hover:text-paper transition-colors text-center truncate"
          >
            Buy Now
          </Link>
        </div>
      </div>
      <Link href={`/product/${product.id}`}>
        <p className="text-sm font-semibold">{product.name}</p>
        <p className="text-[11.5px] opacity-55 mb-2">
          {product.category} · {product.subcategory}
        </p>
        <div className="flex gap-2 items-baseline text-[13px]">
          <span className="line-through opacity-40 text-xs">
            ₹{product.price}
          </span>
          <span className="font-semibold">₹{product.salePrice}</span>
        </div>
      </Link>
    </div>
  );
}
