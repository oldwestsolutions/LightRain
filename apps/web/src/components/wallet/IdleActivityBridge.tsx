"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useIdleStore } from "@/store/useIdleStore";

const TICK_MS = 8000;

export function IdleActivityBridge() {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const touchActivity = useIdleStore((s) => s.touchActivity);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    if (!pathname.startsWith("/wallet/screensaver")) touchActivity();
  }, [pathname, touchActivity]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const onAct = () => touchActivity();
    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener("keydown", onAct, opts);
    window.addEventListener("pointerdown", onAct, opts);
    window.addEventListener("scroll", onAct, opts);
    window.addEventListener("touchstart", onAct, opts);

    return () => {
      window.removeEventListener("keydown", onAct);
      window.removeEventListener("pointerdown", onAct);
      window.removeEventListener("scroll", onAct);
      window.removeEventListener("touchstart", onAct);
    };
  }, [isLoggedIn, touchActivity]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (pathname.startsWith("/wallet/screensaver")) return;

    const id = window.setInterval(() => {
      if (useIdleStore.getState().isIdleExceeded()) {
        const returnTo = `${pathname}${window.location.search || ""}`;
        router.replace(`/wallet/screensaver?returnTo=${encodeURIComponent(returnTo)}`);
      }
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [isLoggedIn, pathname, router]);

  return null;
}
