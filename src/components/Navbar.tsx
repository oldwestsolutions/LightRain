import { useState } from "react";
import { LogOut, Menu, Search, X } from "lucide-react";
import type { User } from "../store/useAuthStore";

type Props = {
  user: User;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onLogout: () => void;
};

export function Navbar({ user, searchQuery, onSearchChange, onLogout }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-neutral-200/90 bg-white/95 shadow-nav backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3.5 lg:px-8">
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-neutral-800 lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <span className="text-lg font-semibold tracking-tight text-neutral-900">
              Light<span className="text-accent">Rain</span>
            </span>
          </div>

          <div className="hidden min-w-0 flex-1 justify-center px-4 lg:flex">
            <label htmlFor="nav-search" className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="nav-search"
                type="search"
                placeholder="Search merchants by name or federation address…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-full border border-neutral-200 bg-neutral-50/80 py-3 pl-11 pr-5 text-sm text-neutral-900 placeholder:text-muted/80 outline-none transition-all duration-300 focus:border-neutral-300 focus:bg-white focus:shadow-sm"
              />
            </label>
          </div>

          <div className="ml-auto hidden items-center gap-5 lg:flex">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-800 ring-2 ring-white"
                aria-hidden
              >
                {user.initials}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                <p className="max-w-[160px] truncate text-xs text-muted">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-neutral-100 bg-white px-4 py-4 lg:hidden">
            <label htmlFor="nav-search-mobile" className="relative mb-4 block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="nav-search-mobile"
                type="search"
                placeholder="Search merchants…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-4 text-sm text-neutral-900 placeholder:text-muted/80 outline-none focus:border-neutral-300"
              />
            </label>
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-800">
                {user.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-900">{user.name}</p>
                <p className="truncate text-xs text-muted">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onLogout();
                setMobileOpen(false);
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        )}
      </header>
    </>
  );
}
