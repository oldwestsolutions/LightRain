"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Lock, Mail } from "lucide-react";
import {
  configureAuth,
  createSessionFromCredentials,
  persistSession,
  readSession,
  type AuthSession,
} from "@lightrain/auth";
import { ForbiddenPage } from "@/views/ForbiddenPage";
import { AdminShell } from "./AdminShell";

const GUEST_EMAIL = "guest@lightra.in";

export function AdminGate({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof localStorage === "undefined") return true;
    return localStorage.getItem("lr_admin_theme") !== "light";
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    configureAuth({
      cookieDomain: process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN || undefined,
    });
    setSession(readSession());
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("lr_admin_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      const next = createSessionFromCredentials(email.trim() || GUEST_EMAIL, password);
      persistSession(next);
      setSession(next);
    } finally {
      setSigningIn(false);
    }
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-sm text-zinc-500">
        Loading…
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-zinc-50">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <h1 className="text-xl font-semibold tracking-tight">Staff sign-in</h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Demo: use an operator email such as{" "}
            <span className="font-mono text-zinc-300">admin@lightra.in</span> with any password.
          </p>
          <form onSubmit={signIn} className="mt-6 space-y-4">
            <div>
              <label htmlFor="a-email" className="mb-1 block text-xs font-medium text-zinc-500">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  id="a-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 py-2.5 pl-10 pr-3 text-sm text-zinc-100"
                  placeholder="admin@lightra.in"
                />
              </div>
            </div>
            <div>
              <label htmlFor="a-password" className="mb-1 block text-xs font-medium text-zinc-500">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  id="a-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 py-2.5 pl-10 pr-3 text-sm text-zinc-100"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={signingIn}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-red-600 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50"
            >
              {signingIn ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (session.role !== "admin") {
    return (
      <div className="min-h-screen bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
        <ForbiddenPage />
      </div>
    );
  }

  return (
    <AdminShell session={session} darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)}>
      {children}
    </AdminShell>
  );
}
