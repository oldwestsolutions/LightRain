import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";

type Props = {
  onLogout: () => void;
};

export function Navbar({ onLogout }: Props) {
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

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[60] border-b border-neutral-200/90 bg-white/95 shadow-nav backdrop-blur-md transition-transform duration-300 ease-out safe-pt ${
        scrollHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-4 lg:px-8 lg:py-3.5">
        <span className="font-display min-w-0 truncate text-base font-normal tracking-[0.1em] text-neutral-900 sm:text-lg sm:tracking-[0.12em]">
          Light<span className="text-accent">Rain</span>
        </span>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex min-h-[40px] shrink-0 touch-manipulation items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </header>
  );
}
