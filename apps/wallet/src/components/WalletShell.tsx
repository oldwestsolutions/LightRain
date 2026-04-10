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
  const onLogout = () => {
    clearSession();
    window.location.assign("/");
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
    >
      {children}
    </AppShell>
  );
}
