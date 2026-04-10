"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, HelpCircle, LogOut, Shield, UserRound } from "lucide-react";

type Props = {
  onLogout: () => void;
};

export function Navbar({ onLogout }: Props) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrollHidden, setScrollHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
  }, [pathname]);

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

  const menuTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[60] border-b border-neutral-200/90 bg-white/95 shadow-nav backdrop-blur-md transition-transform duration-300 ease-out safe-pt ${
        scrollHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-start gap-3 px-3 py-3 sm:px-4 lg:px-8 lg:py-3.5">
        <div className="relative" ref={menuRef}>
          <button
            ref={buttonRef}
            type="button"
            id="account-menu-button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-controls="account-menu"
            className="inline-flex min-h-[40px] max-w-[min(100vw-2rem,16rem)] touch-manipulation items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-left transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100"
          >
            <span className="font-display min-w-0 truncate text-base font-normal tracking-[0.1em] text-neutral-900 sm:text-lg sm:tracking-[0.12em]">
              Light<span className="text-accent">Rain</span>
            </span>
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="account-menu"
                role="menu"
                aria-labelledby="account-menu-button"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                transition={menuTransition}
                className="absolute left-0 top-[calc(100%+0.375rem)] z-[70] w-[min(calc(100vw-1.5rem),16rem)] origin-top-left overflow-hidden rounded-2xl border border-neutral-200/90 bg-white py-1.5 shadow-lg"
              >
                <Link
                  href="/account/profile"
                  role="menuitem"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
                >
                  <UserRound className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                  Profile & settings
                </Link>
                <Link
                  href="/account/security"
                  role="menuitem"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
                >
                  <Shield className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                  Security
                </Link>
                <Link
                  href="/account/statements"
                  role="menuitem"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
                >
                  <FileText className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                  Statements & taxes
                </Link>
                <Link
                  href="/support"
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
