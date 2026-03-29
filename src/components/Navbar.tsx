import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  FileText,
  HelpCircle,
  LogOut,
  Shield,
  UserRound,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

type Props = {
  onLogout: () => void;
};

export function Navbar({ onLogout }: Props) {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();
  const [scrollHidden, setScrollHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const displayName = user?.name?.trim() || "Account";

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

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || buttonRef.current?.contains(t)) return;
      setMenuOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[60] border-b border-neutral-200/90 bg-white/95 shadow-nav backdrop-blur-md transition-transform duration-300 ease-out safe-pt ${
        scrollHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-end gap-3 px-3 py-3 sm:px-4 lg:px-8 lg:py-3.5">
        <div className="relative" ref={menuRef}>
          <button
            ref={buttonRef}
            type="button"
            id="account-menu-button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-controls="account-menu"
            className="inline-flex min-h-[40px] max-w-[min(100vw-2rem,16rem)] touch-manipulation items-center gap-2 rounded-full border border-neutral-200 bg-white py-2 pl-3 pr-2.5 text-left text-sm font-semibold text-neutral-900 transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100"
          >
            <span className="min-w-0 flex-1 truncate">{displayName}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform ${menuOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>

          {menuOpen && (
            <div
              id="account-menu"
              role="menu"
              aria-labelledby="account-menu-button"
              className="absolute right-0 top-[calc(100%+0.375rem)] z-[70] w-[min(calc(100vw-1.5rem),16rem)] overflow-hidden rounded-2xl border border-neutral-200/90 bg-white py-1.5 shadow-lg"
            >
              <Link
                to="/account/profile"
                role="menuitem"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
              >
                <UserRound className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                Profile & settings
              </Link>
              <Link
                to="/account/security"
                role="menuitem"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
              >
                <Shield className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                Security
              </Link>
              <Link
                to="/account/statements"
                role="menuitem"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
              >
                <FileText className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                Statements & taxes
              </Link>
              <Link
                to="/support"
                role="menuitem"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
              >
                <HelpCircle className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                Help & support
              </Link>
              <div className="my-1 border-t border-neutral-100" role="none" />
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
              >
                <LogOut className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
