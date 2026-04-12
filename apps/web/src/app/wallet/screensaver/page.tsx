"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { IdleScreensaver } from "@/components/wallet/IdleScreensaver";

export default function WalletScreensaverPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-3 bg-neutral-950/80 text-neutral-400">
          <Loader2 className="h-9 w-9 animate-spin text-accent" aria-hidden />
        </div>
      }
    >
      <IdleScreensaver />
    </Suspense>
  );
}
