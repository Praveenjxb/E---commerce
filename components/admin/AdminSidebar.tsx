"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, Tags, BarChart3, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/store/auth";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuth((s) => s.logout);

  return (
    <aside className="w-60 flex-shrink-0 bg-ink text-paper min-h-screen flex flex-col">
      <div className="px-6 py-7 font-serif text-xl tracking-[0.14em]">LUFFY</div>
      <nav className="flex-1 px-3 space-y-0.5">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={`flex items-center gap-3 px-4 py-3 text-sm rounded-sm ${active ? "bg-white/10 font-medium" : "opacity-70 hover:opacity-100"}`}>
              <Icon size={16} /> {label}
            </Link>
          );
        })}
      </nav>
      <button onClick={() => { logout(); router.push("/"); }} className="flex items-center gap-3 px-7 py-5 text-sm opacity-70 hover:opacity-100 border-t border-white/10">
        <LogOut size={16} /> Logout
      </button>
    </aside>
  );
}
