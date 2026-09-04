"use client";
import { useAuth } from "@/store/auth";

export default function AdminSettingsPage() {
  const currentUser = useAuth((s) => s.currentUser);

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Settings</h1>
      <div className="border border-black/10 bg-white p-6 max-w-md space-y-4">
        <div>
          <p className="text-xs uppercase tracking-widest opacity-55 mb-1.5">Admin Name</p>
          <input defaultValue={currentUser?.name} className="w-full border border-black/20 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest opacity-55 mb-1.5">Admin Email</p>
          <input defaultValue={currentUser?.email} className="w-full border border-black/20 px-4 py-2.5 text-sm" />
        </div>
        <button className="bg-ink text-paper px-6 py-2.5 text-xs font-semibold tracking-widest uppercase">Save Changes</button>
      </div>
    </div>
  );
}
