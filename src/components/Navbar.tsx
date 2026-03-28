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
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-8">
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-white lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <span className="text-lg font-bold tracking-tight text-white">
              LightRa<span className="text-mint">.</span>in
            </span>
          </div>

          <div className="hidden min-w-0 flex-1 justify-center px-4 lg:flex">
            <label htmlFor="nav-search" className="relative w-full max-w-2xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="nav-search"
                type="search"
                placeholder="Search merchants by name or federation address…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-full border border-white/12 bg-white/[0.03] py-3 pl-11 pr-5 text-sm text-white placeholder:text-muted/70 outline-none transition-all duration-300 focus:border-mint/35 focus:bg-white/[0.05]"
              />
            </label>
          </div>

          <div className="ml-auto hidden items-center gap-4 lg:flex">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-sm font-semibold text-white"
                aria-hidden
              >
                {user.initials}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="max-w-[160px] truncate text-xs text-muted">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-muted transition-all duration-300 hover:border-white/30 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-black px-4 py-4 lg:hidden">
            <label htmlFor="nav-search-mobile" className="relative mb-4 block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="nav-search-mobile"
                type="search"
                placeholder="Search merchants…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-full border border-white/12 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder:text-muted/70 outline-none focus:border-mint/35"
              />
            </label>
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-sm font-semibold">
                {user.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{user.name}</p>
                <p className="truncate text-xs text-muted">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onLogout();
                setMobileOpen(false);
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </header>
    </>
  );
}
