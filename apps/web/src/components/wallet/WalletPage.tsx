"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Wallet } from "lucide-react";
import { useWalletStore, formatUsdFromCents } from "@/store/useWalletStore";
import { SearchBar } from "./SearchBar";

export function WalletPage() {
  const router = useRouter();
  const cashBalanceCents = useWalletStore((s) => s.cashBalanceCents);
  const syncStatus = useWalletStore((s) => s.syncStatus);
  const [query, setQuery] = useState("");

  const goSearch = () => {
    const q = query.trim();
    router.push(`/wallet/search${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  };

  const feelingLucky = () => {
    router.push("/wallet/discover");
  };

  const balance = formatUsdFromCents(cashBalanceCents);
  const balanceHint =
    syncStatus === "syncing" ? "Syncing…" : syncStatus === "error" ? "Balance unavailable" : "Available balance";

  return (
    <main className="relative mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
      <Link
        href="/wallet/manage"
        className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200/90 bg-white/90 text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 sm:right-0 sm:top-4"
        aria-label="Wallet management"
      >
        <Wallet className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
      </Link>

      <div className="mt-10 flex flex-col items-center sm:mt-14">
        <SearchBar value={query} onChange={setQuery} onSubmit={goSearch} />

        <div className="mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <button
            type="button"
            onClick={goSearch}
            className="h-11 rounded-full border border-neutral-200 bg-neutral-900 px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
          >
            Search
          </button>
          <button
            type="button"
            onClick={feelingLucky}
            className="h-11 rounded-full border border-neutral-200 bg-white px-8 text-sm font-semibold text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50"
          >
            I&apos;m Feeling Lucky
          </button>
        </div>

        <p className="mt-10 text-center text-sm tabular-nums text-neutral-500">
          <span className="text-neutral-400">{balanceHint}</span>
          <span className="mx-2 text-neutral-300">·</span>
          <span className="font-medium text-neutral-700">
            $<span className="tabular-nums">{balance}</span>
          </span>
        </p>
      </div>
    </main>
  );
}
