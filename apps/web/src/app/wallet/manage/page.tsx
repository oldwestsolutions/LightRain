"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SendPaymentModal } from "@/components/SendPaymentModal";
import { WalletManageView } from "@/components/wallet/WalletManageView";
import { MERCHANTS } from "@/data/merchants";
import { useWalletUiStore } from "@/store/useWalletUiStore";

const FEDERATION_ADDRESS = "dispensary01*lightrain.in";

export default function WalletManagePage() {
  const walletDisplayName = useWalletUiStore((s) => s.walletDisplayName);
  const setWalletDisplayName = useWalletUiStore((s) => s.setWalletDisplayName);
  const [draftName, setDraftName] = useState(walletDisplayName);
  const [sendOpen, setSendOpen] = useState(false);

  useEffect(() => {
    setDraftName(walletDisplayName);
  }, [walletDisplayName]);

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
      <Link
        href="/wallet/hub"
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 underline-offset-4 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to wallet
      </Link>

      <header className="mt-6 border-b border-neutral-100 pb-6">
        <h1 className="font-display text-2xl font-normal tracking-tight text-neutral-900 sm:text-3xl">
          Wallet management
        </h1>
        <p className="mt-2 text-sm text-neutral-500">Balances, receiving address, and quick actions.</p>
      </header>

      <section className="mt-8 rounded-xl border border-neutral-200/90 bg-white p-4 shadow-sm">
        <label htmlFor="wallet-display-name" className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Wallet name
        </label>
        <input
          id="wallet-display-name"
          type="text"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onBlur={() => setWalletDisplayName(draftName)}
          placeholder="My Wallet"
          className="mt-2 min-h-[44px] w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-900/10"
        />
        <p className="mt-2 text-[11px] text-neutral-400">Shown on your wallet home and idle screen.</p>
      </section>

      <div className="mt-8">
        <WalletManageView federationAddress={FEDERATION_ADDRESS} onOpenSend={() => setSendOpen(true)} />
      </div>

      <SendPaymentModal open={sendOpen} onClose={() => setSendOpen(false)} merchants={MERCHANTS} />
    </main>
  );
}
