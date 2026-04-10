"use client";

import { MarketingPageShell } from "@/components/MarketingPageShell";
import { URL_SHOP } from "@/lib/site";
import { Package, Shield, Shirt, BookOpen, Sticker, Usb, LockKeyhole } from "lucide-react";

type Product = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  category: "wallets" | "merch" | "security";
  Icon: typeof Package;
};

const PRODUCTS: Product[] = [
  {
    id: "hw-compact",
    name: "Compact hardware wallet",
    tagline: "USB-C signing device. Store keys offline; confirm transactions on-device.",
    price: "$79",
    category: "wallets",
    Icon: Usb,
  },
  {
    id: "hw-airgap",
    name: "Air-gapped cold signer",
    tagline: "MicroSD workflow for PSBTs. No live network on the key device.",
    price: "$149",
    category: "wallets",
    Icon: LockKeyhole,
  },
  {
    id: "steel-plate",
    name: "Stainless seed backup plate",
    tagline: "Punch or engrave your backup. Fire- and water-resistant storage.",
    price: "$42",
    category: "security",
    Icon: Shield,
  },
  {
    id: "faraday",
    name: "Signal-shield pouch",
    tagline: "RF isolation for phones and small hardware wallets when traveling.",
    price: "$28",
    category: "security",
    Icon: Package,
  },
  {
    id: "tee-orange",
    name: "Bitcoin wordmark tee",
    tagline: "Heavyweight cotton, minimal front print. Unisex sizing.",
    price: "$32",
    category: "merch",
    Icon: Shirt,
  },
  {
    id: "cap-sats",
    name: "“Stack sats” cap",
    tagline: "Low-profile dad hat, embroidered. One size adjustable.",
    price: "$26",
    category: "merch",
    Icon: Package,
  },
  {
    id: "book-self-custody",
    name: "Self-custody primer",
    tagline: "Paperback on keys, backups, and multisig basics — vendor-neutral.",
    price: "$19",
    category: "merch",
    Icon: BookOpen,
  },
  {
    id: "stickers",
    name: "Sticker sheet pack",
    tagline: "Die-cut lightning, block, and logo marks. Matte vinyl, outdoor-safe.",
    price: "$12",
    category: "merch",
    Icon: Sticker,
  },
];

function ProductCard({ product }: { product: Product }) {
  const { Icon } = product;
  return (
    <article className="flex flex-col rounded-2xl border border-neutral-200/90 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="font-semibold text-neutral-900">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.tagline}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4">
        <span className="text-lg font-semibold tabular-nums text-neutral-900">{product.price}</span>
        <button
          type="button"
          disabled
          className="rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm font-medium text-muted"
          title="Checkout opens when the store goes live"
        >
          Coming soon
        </button>
      </div>
    </article>
  );
}

const SHOP_HOST = URL_SHOP.replace(/^https:\/\//, "");

export function ShopPage() {
  const wallets = PRODUCTS.filter((p) => p.category === "wallets");
  const security = PRODUCTS.filter((p) => p.category === "security");
  const merch = PRODUCTS.filter((p) => p.category === "merch");

  return (
    <MarketingPageShell backTo="/" backLabel="Back to sign in" wide>
      <header className="mb-8 text-center sm:mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">{SHOP_HOST}</p>
        <h1 className="mt-2 font-display text-2xl font-normal tracking-[0.08em] text-neutral-900 sm:text-3xl">
          LightRain shop
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
          Cold-storage tools, physical security, and Bitcoin-themed gear we use ourselves. Checkout is not live yet — this
          page previews what we plan to offer.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="shop-wallets">
        <h2 id="shop-wallets" className="mb-4 text-lg font-semibold text-neutral-900">
          Cold wallets &amp; signers
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {wallets.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mb-12" aria-labelledby="shop-security">
        <h2 id="shop-security" className="mb-4 text-lg font-semibold text-neutral-900">
          Physical security
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {security.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section aria-labelledby="shop-merch">
        <h2 id="shop-merch" className="mb-4 text-lg font-semibold text-neutral-900">
          Bitcoin merch
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {merch.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <p className="mt-10 rounded-xl border border-neutral-200/80 bg-white/60 p-4 text-center text-xs text-muted">
        Prefer this URL? Point <strong className="font-medium text-neutral-700">{SHOP_HOST}</strong> at this site
        (same app, <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">/shop</code>) when your DNS is
        ready.
      </p>
    </MarketingPageShell>
  );
}
