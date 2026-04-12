import { create } from "zustand";
import { persist } from "zustand/middleware";

type WalletUiState = {
  /** User-defined wallet label shown on the 3D wallet; empty = use profile name / default */
  walletDisplayName: string;
  setWalletDisplayName: (name: string) => void;
};

export const useWalletUiStore = create(
  persist<WalletUiState>(
    (set) => ({
      walletDisplayName: "",
      setWalletDisplayName: (walletDisplayName) => set({ walletDisplayName: walletDisplayName.trim() }),
    }),
    { name: "lightrain.walletUi.v1" },
  ),
);
