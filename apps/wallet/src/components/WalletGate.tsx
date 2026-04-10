"use client";

import { useEffect, useState, type ReactNode } from "react";
import { configureAuth, consumeWalletHandoffIfPresent, readSession, type AuthSession } from "@lightrain/auth";
import { SignInGate } from "@/views/SignInGate";
import { WalletShell } from "./WalletShell";

export function WalletGate({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof localStorage === "undefined") return true;
    return localStorage.getItem("lr_wallet_theme") !== "light";
  });

  useEffect(() => {
    configureAuth({
      cookieDomain: process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN || undefined,
    });
    consumeWalletHandoffIfPresent();
    setSession(readSession());
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("lr_wallet_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 text-sm text-zinc-500 dark:bg-zinc-950">
        Loading…
      </div>
    );
  }

  if (!session) {
    return <SignInGate />;
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
