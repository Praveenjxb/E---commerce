"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentUser = useAuth((s) => s.currentUser);

  useEffect(() => {
    if (!currentUser) { router.push("/login"); return; }
    if (currentUser.role !== "admin") { router.push("/profile"); }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== "admin") return null;

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 bg-paper min-h-screen p-8">{children}</main>
    </div>
  );
}
