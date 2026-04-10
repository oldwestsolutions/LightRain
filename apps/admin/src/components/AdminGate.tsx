"use client";

import { useEffect, useState, type ReactNode } from "react";
import { configureAuth, consumeWalletHandoffIfPresent, readSession, type AuthSession } from "@lightrain/auth";
import { SignInGate } from "@/views/SignInGate";
import { ForbiddenPage } from "@/views/ForbiddenPage";
import { AdminShell } from "./AdminShell";

export function AdminGate({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof localStorage === "undefined") return true;
    return localStorage.getItem("lr_admin_theme") !== "light";
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
    localStorage.setItem("lr_admin_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-sm text-zinc-500">
        Loading…
      </div>
    );
  }

  if (!session) {
    return <SignInGate />;
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
