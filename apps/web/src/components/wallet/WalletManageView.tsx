"use client";

import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Copy,
  FileText,
  Landmark,
  QrCode,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { formatUsdFromCents, useWalletStore } from "@/store/useWalletStore";
import { useToastStore } from "@/store/useToastStore";

type Props = {
  federationAddress: string;
  onOpenSend: () => void;
};

export function WalletManageView({ federationAddress, onOpenSend }: Props) {
  const cashBalanceCents = useWalletStore((s) => s.cashBalanceCents);
  const syncStatus = useWalletStore((s) => s.syncStatus);
  const lastSyncError = useWalletStore((s) => s.lastSyncError);
  const showToast = useToastStore((s) => s.show);
  const [showFullAddress, setShowFullAddress] = useState(true);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(federationAddress);
      showToast("Address copied");
    } catch {
      showToast("Could not copy");
    }
  };

  const rowBtn =
    "flex w-full items-center gap-3 rounded-xl border border-neutral-200/90 bg-white px-4 py-3.5 text-left text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50";

  const balanceDisplay = formatUsdFromCents(cashBalanceCents);
  const balanceCaption =
    syncStatus === "syncing"
      ? "Syncing with cold wallet…"
      : syncStatus === "error" && lastSyncError
        ? lastSyncError
        : syncStatus === "error"
          ? "Could not sync cold wallet balance."
          : "Cash balance · updates when your cold wallet reports funds";

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-neutral-200/90 bg-neutral-50/90 p-4">
        <p className="text-xs font-medium text-neutral-500">Available</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-neutral-900">
          <span className="text-lg text-neutral-500">$</span>
          {balanceDisplay}
        </p>
        <p className="mt-1 text-xs text-neutral-500">{balanceCaption}</p>
      </div>

      <div className="rounded-xl border border-neutral-200/90 bg-white p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Receiving address</p>
            <button
              type="button"
              onClick={() => setShowFullAddress((s) => !s)}
              className="mt-2 w-full break-all text-left font-mono text-xs font-medium text-neutral-900"
              aria-expanded={showFullAddress}
            >
              {showFullAddress ? federationAddress : "••••••••••••••••••••"}
            </button>
            <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">
              Share this address to receive funds. Tap the address to hide or show.
            </p>
          </div>
          <button
            type="button"
            onClick={copyAddress}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 shadow-sm hover:bg-neutral-50"
          >
            <Copy className="h-3.5 w-3.5" aria-hidden />
            Copy
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Actions</p>
        <button type="button" className={rowBtn} onClick={copyAddress}>
          <Copy className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
          Copy receiving address
        </button>
        <button
          type="button"
          className={rowBtn}
          onClick={() => {
            copyAddress();
            showToast("Use this address when you deposit from an external wallet.");
          }}
        >
          <ArrowDownLeft className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
          Deposit / receive funds
        </button>
        <button type="button" className={rowBtn} onClick={onOpenSend}>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
          Send payment
        </button>
        <button
          type="button"
          className={rowBtn}
          onClick={() => showToast("QR code · Coming soon in a live build.")}
        >
          <QrCode className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
          Show QR for address
        </button>
        <button
          type="button"
          className={rowBtn}
          onClick={() => showToast("Linked banks · Demo only.")}
        >
          <Landmark className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
          Linked funding sources
        </button>
      </div>

      <div className="space-y-2 border-t border-neutral-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Account</p>
        <Link href="/account/statements" className={`${rowBtn} no-underline`}>
          <FileText className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
          Statements & tax forms
        </Link>
        <Link href="/account/security" className={`${rowBtn} no-underline`}>
          <Shield className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
          Wallet security
        </Link>
      </div>
    </div>
  );
}
