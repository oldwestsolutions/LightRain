import { create } from "zustand";

/** Sync lifecycle for a future cold-wallet / custody integration */
export type WalletSyncStatus = "idle" | "syncing" | "ready" | "error";

type WalletState = {
  /** USD amount in cents (integer). Display as dollars with 2 decimals. */
  cashBalanceCents: number;
  syncStatus: WalletSyncStatus;
  lastSyncError: string | null;
  /** Replace balance (e.g. from tests or manual tools). */
  setCashBalanceCents: (cents: number) => void;
  /** Preferred entry point when a cold wallet reports a new balance. */
  applyCashBalanceFromColdWallet: (cents: number) => void;
  setSyncStatus: (status: WalletSyncStatus) => void;
  setLastSyncError: (message: string | null) => void;
};

export function formatUsdFromCents(cents: number): string {
  const n = Math.round(Number.isFinite(cents) ? cents : 0);
  return (n / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const useWalletStore = create<WalletState>((set) => ({
  cashBalanceCents: 0,
  syncStatus: "idle",
  lastSyncError: null,

  setCashBalanceCents: (cents) =>
    set({
      cashBalanceCents: Math.max(0, Math.round(cents)),
      lastSyncError: null,
    }),

  applyCashBalanceFromColdWallet: (cents) =>
    set({
      cashBalanceCents: Math.max(0, Math.round(cents)),
      syncStatus: "ready",
      lastSyncError: null,
    }),

  setSyncStatus: (syncStatus) => set({ syncStatus }),

  setLastSyncError: (lastSyncError) => set({ lastSyncError }),
}));
