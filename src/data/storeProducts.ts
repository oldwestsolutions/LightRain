export type StoreProduct = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  category: "cold-wallet" | "hardware" | "backup";
  /** Placeholder — swap for real product images when ready */
  accent: "slate" | "zinc" | "stone" | "neutral";
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: "arc-vault-s2",
    name: "Arc Vault S2",
    tagline: "Cold storage · CC EAL6+ secure element",
    price: "$149.00",
    category: "cold-wallet",
    accent: "slate",
  },
  {
    id: "ledger-style-x",
    name: "Signer Pro X",
    tagline: "Bluetooth · Stellar & multi-chain",
    price: "$179.00",
    category: "cold-wallet",
    accent: "zinc",
  },
  {
    id: "trezor-style-safe",
    name: "SafeKey Model T",
    tagline: "Touchscreen · open firmware option",
    price: "$219.00",
    category: "cold-wallet",
    accent: "neutral",
  },
  {
    id: "coldcard-style",
    name: "BlockVault Airgap",
    tagline: "PSBT · air-gapped signing",
    price: "$157.00",
    category: "cold-wallet",
    accent: "stone",
  },
  {
    id: "steel-plate",
    name: "SteelPhrase 24",
    tagline: "Metal backup plate · fire rated",
    price: "$89.00",
    category: "backup",
    accent: "zinc",
  },
  {
    id: "hsm-usb",
    name: "USB HSM FIDO2",
    tagline: "WebAuthn · phishing-resistant keys",
    price: "$45.00",
    category: "hardware",
    accent: "slate",
  },
];
