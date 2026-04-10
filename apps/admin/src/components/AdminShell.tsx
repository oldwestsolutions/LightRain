"use client";

import type { ReactNode } from "react";
import { AppShell, type ShellNavItem } from "@lightrain/ui";
import type { AuthSession } from "@lightrain/auth";
import { clearSession } from "@lightrain/auth";

const navItems: ShellNavItem[] = [
  { to: "/", label: "System health", end: true },
  { to: "/incidents", label: "Incidents" },
  { to: "/controls", label: "Controls" },
  { to: "/logs", label: "Logs" },
  { to: "/deployments", label: "Deployments" },
];

type AdminShellProps = {
  session: AuthSession;
  darkMode: boolean;
  onToggleDark: () => void;
  children: ReactNode;
};

export function AdminShell({ session, darkMode, onToggleDark, children }: AdminShellProps) {
  const webOrigin = (process.env.NEXT_PUBLIC_WEB_ORIGIN || "https://lightra.in").replace(/\/$/, "");

  const onLogout = () => {
    clearSession();
    window.location.href = `${webOrigin}/`;
  };

  return (
    <AppShell
      productName="LightRain"
      productBadge="Admin"
      navItems={navItems}
      userLabel={session.user.name}
      userSublabel={`${session.user.email} · ${session.role}`}
      darkMode={darkMode}
      onToggleDark={onToggleDark}
      onLogout={onLogout}
    >
      {children}
    </AppShell>
  );
}
