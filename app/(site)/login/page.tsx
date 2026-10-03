"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email, password);
    if (!res.ok) { setError(res.error ?? "Something went wrong."); return; }
    router.push(res.user!.role === "admin" ? "/admin" : "/profile");
  };

  return (
    <section className="px-[5vw] py-20 max-w-md mx-auto">
      <h1 className="font-serif text-3xl mb-2">Login</h1>
      <p className="text-sm opacity-60 mb-8">Welcome back to LUFFY.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full border border-black/20 px-4 py-3 text-sm" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required className="w-full border border-black/20 px-4 py-3 text-sm" />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button type="submit" className="w-full bg-ink text-paper py-3.5 text-xs font-semibold tracking-widest uppercase">Login</button>
      </form>

      

      <p className="text-sm mt-8">
        New here? <Link href="/signup" className="font-semibold border-b border-ink pb-0.5">Create an account</Link>
      </p>
    </section>
  );
}
