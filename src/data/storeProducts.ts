export type CategoryAccent = "slate" | "zinc" | "stone" | "neutral";

export type StoreCategoryItem = {
  id: string;
  title: string;
  description: string;
  accent: CategoryAccent;
  /** Lucide icon name — mapped in CompanyPage */
  icon:
    | "wallet"
    | "unplug"
    | "scroll"
    | "layers"
    | "users"
    | "package"
    | "laptop"
    | "wifi-off";
};

/** Section 2 — Core product categories */
export const CORE_PRODUCT_CATEGORIES: StoreCategoryItem[] = [
  {
    id: "hardware-cold-wallets",
    title: "Hardware Cold Wallets",
    description:
      "Secure physical devices for storing digital assets offline. Designed for long-term custody with multiple security tiers.",
    accent: "slate",
    icon: "wallet",
  },
  {
    id: "air-gapped-devices",
    title: "Air-Gapped Devices",
    description:
      "Offline signing systems that never connect to the internet. Transactions are verified using isolated, one-way communication.",
    accent: "zinc",
    icon: "unplug",
  },
  {
    id: "paper-wallet-kits",
    title: "Paper Wallet Kits",
    description:
      "Simple offline key generation and storage kits for users who want physical backups without digital exposure.",
    accent: "stone",
    icon: "scroll",
  },
  {
    id: "steel-backup-systems",
    title: "Steel Backup Systems",
    description:
      "Durable, fireproof, and corrosion-resistant storage for recovery phrases and critical access credentials.",
    accent: "neutral",
    icon: "layers",
  },
];

/** Section 3 — Advanced systems */
export const ADVANCED_PRODUCT_CATEGORIES: StoreCategoryItem[] = [
  {
    id: "multisig-vaults",
    title: "Multi-Signature Vaults",
    description:
      "Distributed key systems that require multiple approvals to access funds, designed for businesses and high-value accounts.",
    accent: "slate",
    icon: "users",
  },
  {
    id: "custody-kits",
    title: "Custody Kits",
    description:
      "Bundled systems combining hardware wallets, backups, and shielding for complete asset protection.",
    accent: "zinc",
    icon: "package",
  },
  {
    id: "offline-signing-devices",
    title: "Offline Signing Devices",
    description:
      "Dedicated machines for generating and signing transactions in fully isolated environments.",
    accent: "stone",
    icon: "laptop",
  },
  {
    id: "signal-isolation-faraday",
    title: "Signal Isolation (Faraday Protection)",
    description:
      "Physical shielding solutions that prevent wireless interference and unauthorized access.",
    accent: "neutral",
    icon: "wifi-off",
  },
];
