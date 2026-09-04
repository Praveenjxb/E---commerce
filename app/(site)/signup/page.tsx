"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";

export default function SignupPage() {
  const router = useRouter();
  const signup = useAuth((s) => s.signup);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = signup(name, email, password);
    if (!res.ok) { setError(res.error ?? "Something went wrong."); return; }
    router.push("/profile");
  };

  return (
    <section className="px-[5vw] py-20 max-w-md mx-auto">
      <h1 className="font-serif text-3xl mb-2">Create Account</h1>
      <p className="text-sm opacity-60 mb-8">Join LUFFY for a faster checkout and order tracking.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required className="w-full border border-black/20 px-4 py-3 text-sm" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full border border-black/20 px-4 py-3 text-sm" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required minLength={6} className="w-full border border-black/20 px-4 py-3 text-sm" />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button type="submit" className="w-full bg-ink text-paper py-3.5 text-xs font-semibold tracking-widest uppercase">Create Account</button>
      </form>

      <p className="text-sm mt-8">
        Already have an account? <Link href="/login" className="font-semibold border-b border-ink pb-0.5">Login</Link>
      </p>
    </section>
  );
}
