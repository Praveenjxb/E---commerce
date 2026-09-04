"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { USERS } from "@/lib/data";
import { User } from "@/lib/types";

type AuthState = {
  currentUser: User | null;
  login: (email: string, password: string) => { ok: boolean; user?: User; error?: string };
  signup: (name: string, email: string, password: string) => { ok: boolean; user?: User; error?: string };
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      login: (email, password) => {
        const user = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (!user) return { ok: false, error: "Invalid email or password." };
        set({ currentUser: user });
        return { ok: true, user };
      },
      signup: (name, email, password) => {
        if (USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
          return { ok: false, error: "An account with this email already exists." };
        }
        const user: User = { name, email, password, role: "user" };
        USERS.push(user);
        set({ currentUser: user });
        return { ok: true, user };
      },
      logout: () => set({ currentUser: null }),
    }),
    { name: "luffy-auth" }
  )
);
