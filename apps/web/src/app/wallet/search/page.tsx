"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { StoreResults } from "@/components/wallet/StoreResults";

function WalletSearchInner() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  return <StoreResults query={q} />;
}

export default function WalletSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50dvh] flex-col items-center justify-center gap-3 text-neutral-500">
          <Loader2 className="h-9 w-9 animate-spin text-accent" aria-hidden />
          <p className="text-sm">Loading search…</p>
        </div>
      }
    >
      <WalletSearchInner />
    </Suspense>
  );
}
