"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

export type ShellNavItem = {
  to: string;
  label: string;
  end?: boolean;
};

function isNavActive(pathname: string, item: ShellNavItem): boolean {
  if (item.end) return pathname === item.to;
  if (pathname === item.to) return true;
  return pathname.startsWith(`${item.to}/`);
}

type AppShellProps = {
  productName: string;
  productBadge?: string;
  navItems: ShellNavItem[];
  children: ReactNode;
  userLabel: string;
  userSublabel?: string;
  darkMode: boolean;
  onToggleDark: () => void;
  onLogout: () => void;
  headerActions?: ReactNode;
};

export function AppShell({
  productName,
  productBadge,
  navItems,
  children,
  userLabel,
  userSublabel,
  darkMode,
  onToggleDark,
  onLogout,
  headerActions,
}: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen min-h-[100dvh] bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900 md:flex">
        <div className="flex h-14 items-center gap-2 border-b border-zinc-200/80 px-4 dark:border-zinc-800">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">{productName}</span>
            {productBadge ? (
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {productBadge}
              </span>
            ) : null}
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {navItems.map((item) => {
            const active = isNavActive(pathname, item);
            return (
              <Link
                key={item.to}
                href={item.to}
                className={[
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/80",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-zinc-200/80 p-3 dark:border-zinc-800">
          <div className="rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50">
            <p className="truncate text-sm font-medium">{userLabel}</p>
            {userSublabel ? <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{userSublabel}</p> : null}
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="mt-2 w-full rounded-lg border border-zinc-200 px-3 py-2 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-zinc-200/80 bg-white/90 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
          <div className="flex min-w-0 flex-1 items-center gap-2 md:hidden">
            <span className="truncate text-sm font-semibold">{productName}</span>
          </div>
          <div className="flex items-center gap-2">
            {headerActions}
            <button
              type="button"
              onClick={onToggleDark}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </header>

        <div className="border-b border-zinc-200/80 bg-white px-2 py-2 dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const active = isNavActive(pathname, item);
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={[
                    "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold",
                    active
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                      : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
