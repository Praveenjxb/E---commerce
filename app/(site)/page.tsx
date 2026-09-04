"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Truck, PackageCheck, ShieldCheck, Lock } from "lucide-react";
import Placeholder from "@/components/Placeholder";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/store/catalog";

export default function HomePage() {
  const products = useCatalog((s) => s.products).slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-warm px-[5vw] pt-12 sm:pt-16 overflow-hidden">
        <div className="relative z-10 flex items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[11px] sm:text-[13px] font-semibold uppercase tracking-wide max-w-[140px] sm:max-w-[180px] leading-relaxed"
          >
            Fashion
            <br />
            that moves
            <br />
            with you.
            <div className="w-8 h-px bg-ink mt-2.5" />
          </motion.div>
        </div>

        <div className="relative h-[78vw] sm:h-[62vw] max-h-[620px] flex items-end justify-center -mt-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="font-serif absolute left-0 right-0 top-[25%] sm:top-[29%] text-center font-extrabold leading-[0.82] select-none z-0"
            style={{ fontSize: "min(19vw, 190px)" }}
          >
            LUFFY
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative z-10 w-[62vw] sm:w-[min(42vw,400px)] h-[95%]"
          >
            <Image
              src="/images/hero-model.png"
              alt="LUFFY Collection Model"
              fill
              priority
              sizes="(max-width: 640px) 62vw, 400px"
              className="object-contain object-bottom drop-shadow-2xl select-none pointer-events-none"
            />
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-5 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <button className="bg-ink text-paper px-8 py-3.5 text-[11px] font-semibold tracking-widest uppercase w-fit">
              Shop Now
            </button>
            <Link
              href="/shop"
              className="text-[11px] font-semibold tracking-widest uppercase border-b border-ink pb-0.5 w-fit"
            >
              Explore New In
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-right leading-relaxed self-end"
          >
            New
            <br />
            Collection
            <br />
            2026
            <div className="w-8 h-px bg-ink mt-2.5 ml-auto" />
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-ink text-paper grid grid-cols-1 md:grid-cols-3">
        <CategoryCard
          title="MEN"
          desc="Elevated everyday essentials."
          href="/shop?category=Men"
          image="/images/category-men.jpg"
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
          borderless
        />
        <CategoryCard
          title="WOMEN"
          desc="Effortless style for every day."
          href="/shop?category=Women"
          image="/images/category-women.jpg"
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
          borderless
        />
        <CategoryCard
          title="KIDS"
          desc="Comfort meets cool everyday."
          href="/shop?category=Kids"
          image="/images/category-kids.jpg"
          className="object-cover grayscale hover:grayscale-0 transition-all duration-600 ease-out"
          borderless
        />
      </section>

      {/* NEW SEASON */}
      <section className="grid md:grid-cols-[1fr_1.15fr] bg-paper min-h-[420px] md:min-h-[560px]">
        <div className="px-[6vw] py-12 md:py-0 flex flex-col justify-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-4">
            New Season
          </div>
          <h2
            className="font-serif font-bold leading-[0.92] mb-6"
            style={{ fontSize: "min(9vw, 74px)" }}
          >
            New
            <br />
            Vibes
          </h2>
          <p className="text-[15px] leading-relaxed max-w-[320px] opacity-80 mb-7">
            Discover everything new and now — pieces built for movement, made to
            last beyond the season.
          </p>
          <button className="bg-ink text-paper px-8 py-3.5 text-[11px] font-semibold tracking-widest uppercase w-fit">
            Explore Collection
          </button>
        </div>
        <div className="relative aspect-[4/5] md:aspect-auto min-h-[360px] md:min-h-full overflow-hidden">
          <Image
            src="/images/new-season.jpg"
            alt="New Season clothing collection"
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-y border-black/10">
        {[
          {
            icon: <Truck size={24} strokeWidth={1.5} />,
            title: "Fast Delivery",
            desc: "Quick & safe delivery",
          },
          {
            icon: <PackageCheck size={24} strokeWidth={1.5} />,
            title: "Easy Returns",
            desc: "Within 15 days",
          },
          {
            icon: <ShieldCheck size={24} strokeWidth={1.5} />,
            title: "Quality Assured",
            desc: "Best fashion, best quality",
          },
          {
            icon: <Lock size={24} strokeWidth={1.5} />,
            title: "Secure Payment",
            desc: "100% secure checkout",
          },
        ].map((f, i) => (
          <div
            key={f.title}
            className={`p-6 sm:p-8 flex gap-4 items-start ${i !== 0 ? "border-l border-black/10" : ""} ${i === 2 ? "border-l-0 md:border-l" : ""}`}
          >
            <div className="flex-shrink-0 mt-0.5">{f.icon}</div>
            <div>
              <h4 className="text-[13px] uppercase tracking-wide mb-1">
                {f.title}
              </h4>
              <p className="text-xs opacity-60">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* PRODUCT GRID */}
      <section className="px-[5vw] py-16 sm:py-20">
        <div className="flex items-baseline justify-between mb-9">
          <h2 className="font-serif text-2xl sm:text-3xl">Best of LUFFY</h2>
          <Link
            href="/shop"
            className="text-[11px] font-semibold tracking-widest uppercase border-b border-ink pb-0.5"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
