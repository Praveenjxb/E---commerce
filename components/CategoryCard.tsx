"use client";
import Link from "next/link";
import Image from "next/image";
import Placeholder from "./Placeholder";

export default function CategoryCard({
  title,
  desc,
  href,
  icon,
  image,
  className = "",
  borderless,
}: {
  title: string;
  desc: string;
  href: string;
  icon?: "coat" | "dress" | "kid";
  image?: string;
  className?: string;
  borderless?: boolean;
}) {
  return (
    <div
      className={`p-8 sm:p-9 ${borderless ? "" : "border-t md:border-t-0 md:border-l border-white/10"} ${className}`}
    >
      <div className="aspect-[3/4] mb-6 overflow-hidden group relative bg-[#141414]">
        <div className="w-full h-full transition-transform duration-700 group-hover:scale-105 relative">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={
                image.endsWith(".png")
                  ? "object-contain object-bottom p-2 drop-shadow-2xl"
                  : "object-cover"
              }
            />
          ) : (
            <Placeholder tone="dark" icon={icon || "coat"} />
          )}
        </div>
      </div>
      <h3 className="text-lg mb-2 font-serif">{title}</h3>
      <p className="text-sm opacity-70 mb-4">{desc}</p>
      <Link
        href={href}
        className="text-[11px] font-semibold tracking-widest uppercase border-b border-white/30 pb-0.5"
      >
        Shop {title} →
      </Link>
    </div>
  );
}
