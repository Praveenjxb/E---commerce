"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useUI } from "@/store/ui";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";

const navLinks = [
  { label: "MEN", href: "/shop?category=Men" },
  { label: "WOMEN", href: "/shop?category=Women" },
  { label: "KIDS", href: "/shop?category=Kids" },
  { label: "BEAUTY", href: "/shop?category=Beauty" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const {
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useUI();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-paper flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b transition-colors ${
          scrolled
            ? "border-black/10 shadow-[0_8px_22px_-18px_rgba(0,0,0,0.35)]"
            : "border-transparent"
        }`}
      >
        <nav className="hidden md:flex items-center gap-7 flex-1 text-xs font-medium">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="font-serif text-xl sm:text-2xl tracking-[0.14em] font-semibold flex-1 text-center"
        >
          LUFFY
        </Link>

        <div className="hidden md:flex items-center gap-6 flex-1 justify-end text-xs font-medium">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Search size={15} /> SEARCH
          </button>
          <Link href="/login" className="flex items-center gap-1.5">
            <User size={15} /> LOGIN
          </Link>
          <Link href="/wishlist" className="flex items-center gap-1.5">
            <Heart size={15} /> WISHLIST{wishCount > 0 ? ` (${wishCount})` : ""}
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-1.5"
          >
            <ShoppingBag size={15} /> CART ({cartCount})
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <div
        className={`md:hidden overflow-hidden bg-paper border-b border-black/10 transition-[max-height] duration-300 ${mobileMenuOpen ? "max-h-[420px]" : "max-h-0 border-transparent"}`}
      >
        {navLinks.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-5 py-3.5 text-sm font-medium border-t border-black/10"
          >
            {l.label}
          </Link>
        ))}
        <button
          onClick={() => {
            setSearchOpen(true);
            setMobileMenuOpen(false);
          }}
          className="w-full text-left px-5 py-3.5 text-sm font-medium border-t border-black/10 flex items-center gap-2"
        >
          <Search size={15} /> Search
        </button>
        <Link
          href="/login"
          onClick={() => setMobileMenuOpen(false)}
          className="block px-5 py-3.5 text-sm font-medium border-t border-black/10"
        >
          Login
        </Link>
        <Link
          href="/wishlist"
          onClick={() => setMobileMenuOpen(false)}
          className="block px-5 py-3.5 text-sm font-medium border-t border-black/10"
        >
          Wishlist ({wishCount})
        </Link>
        <button
          onClick={() => {
            setCartOpen(true);
            setMobileMenuOpen(false);
          }}
          className="w-full text-left px-5 py-3.5 text-sm font-medium border-t border-black/10"
        >
          Cart ({cartCount})
        </button>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
