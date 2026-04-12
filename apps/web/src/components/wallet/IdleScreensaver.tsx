"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useWalletUiStore } from "@/store/useWalletUiStore";
import { useIdleStore } from "@/store/useIdleStore";
import { WalletDisplay } from "./WalletDisplay";

function defaultWalletName(userName: string | undefined, custom: string) {
  const c = custom.trim();
  if (c) return c;
  const n = userName?.trim();
  if (n) return n;
  return "My Wallet";
}

export function IdleScreensaver() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const customName = useWalletUiStore((s) => s.walletDisplayName);
  const clearScreensaverIdle = useIdleStore((s) => s.clearScreensaverIdle);
  const startScreensaverIdle = useIdleStore((s) => s.startScreensaverIdle);
  const [reloginPrompt, setReloginPrompt] = useState(false);

  const returnToRaw = searchParams.get("returnTo") || "/wallet";
  const returnTo =
    returnToRaw.startsWith("/") && !returnToRaw.startsWith("//") ? returnToRaw : "/wallet";

  const resume = useCallback(() => {
    clearScreensaverIdle();
    setReloginPrompt(false);
    router.push(returnTo);
  }, [clearScreensaverIdle, returnTo, router]);

  useEffect(() => {
    startScreensaverIdle();
    return () => clearScreensaverIdle();
  }, [clearScreensaverIdle, startScreensaverIdle]);

  useEffect(() => {
    const onActivity = () => {
      setReloginPrompt(false);
      resume();
    };
    window.addEventListener("keydown", onActivity);
    window.addEventListener("pointerdown", onActivity);
    return () => {
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("pointerdown", onActivity);
    };
  }, [resume]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (useIdleStore.getState().isScreensaverReloginDue()) setReloginPrompt(true);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  const walletName = defaultWalletName(user?.name, customName);

  const signInAgain = () => {
    logout();
    router.replace("/");
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950/85 px-4 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" aria-hidden />

      <div className="relative z-[1] flex flex-col items-center">
        <WalletDisplay walletName={walletName} variant="screensaver" />
        {reloginPrompt ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="screensaver-relogin-title"
            className="mt-10 w-full max-w-sm rounded-2xl border border-white/10 bg-neutral-900/90 p-6 text-center shadow-xl"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <p id="screensaver-relogin-title" className="text-base font-medium text-white">
              Still there?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">
              You&apos;ve been away for a while. Sign in again to continue, or move the pointer to return to where you
              left off.
            </p>
            <button
              type="button"
              onClick={signInAgain}
              className="mt-5 h-11 w-full rounded-full bg-white text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
            >
              Sign in again
            </button>
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-neutral-400">Move the mouse or tap to resume</p>
        )}
      </div>
    </div>
  );
}
