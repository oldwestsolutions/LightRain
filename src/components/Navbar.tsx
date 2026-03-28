import { useEffect, useRef, useState } from "react";
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
  const [scrollHidden, setScrollHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastY.current;
      if (y < 32) {
        setScrollHidden(false);
      } else if (y > prev + 6) {
        setScrollHidden(true);
      } else if (y < prev - 6) {
        setScrollHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = scrollHidden && !mobileOpen;

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[60] border-b border-neutral-200/90 bg-white/95 shadow-nav backdrop-blur-md transition-transform duration-300 ease-out safe-pt ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-3 sm:gap-4 sm:px-4 lg:px-8 lg:py-3.5">
          <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-lg text-neutral-800 active:bg-neutral-100 lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <span className="font-display truncate text-base font-normal tracking-[0.1em] text-neutral-900 sm:text-lg sm:tracking-[0.12em]">
              Light<span className="text-accent">Rain</span>
            </span>
          </div>

          <div className="hidden min-w-0 flex-1 justify-center px-2 lg:flex lg:px-4">
            <label htmlFor="nav-search" className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted sm:left-4" />
              <input
                id="nav-search"
                type="search"
                placeholder="Search transactions…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="min-h-[44px] w-full rounded-full border border-neutral-200 bg-neutral-50/80 py-2.5 pl-10 pr-4 text-base text-neutral-900 placeholder:text-muted/80 outline-none transition-all duration-300 focus:border-neutral-300 focus:bg-white focus:shadow-sm sm:py-3 sm:pl-11 sm:pr-5 sm:text-sm"
              />
            </label>
          </div>

          <div className="ml-auto hidden items-center gap-3 lg:flex lg:gap-5">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-800 ring-2 ring-white"
                aria-hidden
              >
                {user.initials}
              </div>
              <div className="hidden min-w-0 text-right sm:block">
                <p className="truncate text-sm font-medium text-neutral-900">{user.name}</p>
                <p className="max-w-[160px] truncate text-xs text-muted">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex min-h-[40px] touch-manipulation items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="max-h-[min(70vh,calc(100dvh-3.5rem))] overflow-y-auto overscroll-contain border-t border-neutral-100 bg-white px-4 py-4 safe-pb lg:hidden">
            <label htmlFor="nav-search-mobile" className="relative mb-4 block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="nav-search-mobile"
                type="search"
                placeholder="Search transactions…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="min-h-[48px] w-full rounded-full border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-4 text-base text-neutral-900 placeholder:text-muted/80 outline-none focus:border-neutral-300"
              />
            </label>
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-800">
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
              className="mt-4 flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-neutral-200 py-3 text-base font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
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
