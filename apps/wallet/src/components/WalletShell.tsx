"use client";

import type { ReactNode } from "react";
import { AppShell, type ShellNavItem } from "@lightrain/ui";
import type { AuthSession } from "@lightrain/auth";
import { clearSession } from "@lightrain/auth";

const navItems: ShellNavItem[] = [
  { to: "/", label: "Overview", end: true },
  { to: "/activity", label: "Activity ledger" },
  { to: "/spend-controls", label: "Spend controls" },
  { to: "/compliance", label: "Compliance & risk" },
  { to: "/billing", label: "Billing settings" },
];

type WalletShellProps = {
  session: AuthSession;
  darkMode: boolean;
  onToggleDark: () => void;
  children: ReactNode;
};

export function WalletShell({ session, darkMode, onToggleDark, children }: WalletShellProps) {
  const webOrigin = (process.env.NEXT_PUBLIC_WEB_ORIGIN || "https://lightra.in").replace(/\/$/, "");
  const adminOrigin = (process.env.NEXT_PUBLIC_ADMIN_ORIGIN || "https://admin.lightra.in").replace(/\/$/, "");

  const headerActions =
    session.role === "admin" ? (
      <a
        href={`${adminOrigin}/`}
        className="hidden rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 sm:inline-flex dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        Admin console
      </a>
    ) : null;

  const onLogout = () => {
    clearSession();
    window.location.href = `${webOrigin}/`;
  };

  return (
    <AppShell
      productName="LightRain"
      productBadge="Wallet"
      navItems={navItems}
      userLabel={session.user.name}
      userSublabel={session.user.email}
      darkMode={darkMode}
      onToggleDark={onToggleDark}
      onLogout={onLogout}
      headerActions={headerActions}
    >
      {children}
    </AppShell>
  );
}
