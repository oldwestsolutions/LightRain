import { useWalletStore } from "../store/useWalletStore";

/**
 * Call this from your cold-wallet / hardware flow when you have a fresh USD
 * balance in **cents** (e.g. $12.34 → 1234). This updates the UI everywhere.
 */
export function applyColdWalletBalanceUsdCents(cents: number): void {
  useWalletStore.getState().applyCashBalanceFromColdWallet(cents);
}

/**
 * Placeholder for a future sync (device unlock, RPC, etc.). Implement the
 * body to read the device and then call `applyColdWalletBalanceUsdCents`.
 */
export async function syncColdWalletBalance(): Promise<void> {
  const { setSyncStatus, setLastSyncError } = useWalletStore.getState();
  setSyncStatus("syncing");
  setLastSyncError(null);
  try {
    // TODO: connect to cold wallet, derive balance in USD cents, then:
    // applyColdWalletBalanceUsdCents(cents);
    setSyncStatus("idle");
  } catch (e) {
    const message = e instanceof Error ? e.message : "Cold wallet sync failed";
    setLastSyncError(message);
    setSyncStatus("error");
  }
}
