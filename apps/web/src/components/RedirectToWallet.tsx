"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const defaultWallet = "https://wallet.lightra.in";

export function RedirectToWallet() {
  useEffect(() => {
    const base = (process.env.NEXT_PUBLIC_WALLET_ORIGIN || defaultWallet).replace(/\/$/, "");
    window.location.replace(`${base}/`);
  }, []);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-muted">
      <Loader2 className="h-8 w-8 animate-spin text-accent" aria-hidden />
      <p className="text-sm">Opening your wallet…</p>
    </div>
  );
}
