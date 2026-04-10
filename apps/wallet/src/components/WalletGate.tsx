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
import { WalletShell } from "./WalletShell";

const GUEST_EMAIL = "guest@lightra.in";

export function WalletGate({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof localStorage === "undefined") return true;
    return localStorage.getItem("lr_wallet_theme") !== "light";
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
    localStorage.setItem("lr_wallet_theme", darkMode ? "dark" : "light");
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
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 text-sm text-zinc-500 dark:bg-zinc-950">
        Loading…
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Wallet sign-in
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Demo: use any email and password. Staff-style accounts use{" "}
            <span className="font-mono text-zinc-800 dark:text-zinc-200">admin@lightra.in</span>.
          </p>
          <form onSubmit={signIn} className="mt-6 space-y-4">
            <div>
              <label htmlFor="w-email" className="mb-1 block text-xs font-medium text-zinc-500">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  id="w-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-3 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="w-password" className="mb-1 block text-xs font-medium text-zinc-500">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  id="w-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-3 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={signingIn}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              {signingIn ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <WalletShell
      session={session}
      darkMode={darkMode}
      onToggleDark={() => setDarkMode((d) => !d)}
    >
      {children}
    </WalletShell>
  );
}
