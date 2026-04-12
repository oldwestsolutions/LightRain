"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { useAuthStore } from "@/store/useAuthStore";

export function WalletShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-canvas px-4 text-sm text-muted">
        Returning to sign in…
      </div>
    );
  }

  const hideNav = pathname === "/wallet/screensaver";

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas">
      {!hideNav ? <Navbar onLogout={logout} /> : null}
      <div className={`flex min-h-0 flex-1 flex-col ${hideNav ? "" : "pt-[4.25rem]"}`}>{children}</div>
    </div>
  );
}
