"use client";
import { USERS } from "@/lib/data";
import { useCatalog } from "@/store/catalog";

export default function AdminUsersPage() {
  const orders = useCatalog((s) => s.orders);

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Users</h1>
      <div className="border border-black/10 bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest opacity-55 border-b border-black/10">
              <th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Orders</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.email} className="border-b border-black/5">
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 capitalize">{u.role}</td>
                <td className="p-4">{orders.filter((o) => o.userEmail === u.email).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
