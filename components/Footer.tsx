import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70 px-5 sm:px-10 pt-14 pb-7 text-[13px] mt-16">
      <div className="flex flex-wrap gap-10 justify-between mb-10">
        <div>
          <div className="font-serif text-2xl text-paper tracking-[0.1em] mb-2.5">LUFFY</div>
          <p className="max-w-[220px] opacity-60">Fashion that moves with you.</p>
        </div>
        <div className="flex gap-14 flex-wrap">
          <div>
            <h5 className="text-paper text-[11px] tracking-[0.1em] uppercase mb-3.5">Shop</h5>
            <Link href="/shop?category=Men" className="block mb-2 opacity-75">Men</Link>
            <Link href="/shop?category=Women" className="block mb-2 opacity-75">Women</Link>
            <Link href="/shop?category=Kids" className="block mb-2 opacity-75">Kids</Link>
          </div>
          <div>
            <h5 className="text-paper text-[11px] tracking-[0.1em] uppercase mb-3.5">Support</h5>
            <span className="block mb-2 opacity-75">Track Order</span>
            <span className="block mb-2 opacity-75">Returns</span>
            <span className="block mb-2 opacity-75">Help</span>
          </div>
          <div>
            <h5 className="text-paper text-[11px] tracking-[0.1em] uppercase mb-3.5">Account</h5>
            <Link href="/login" className="block mb-2 opacity-75">Login</Link>
            <Link href="/profile" className="block mb-2 opacity-75">Profile</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-5 text-[11px] opacity-50">© 2026 LUFFY. All rights reserved.</div>
    </footer>
  );
}
