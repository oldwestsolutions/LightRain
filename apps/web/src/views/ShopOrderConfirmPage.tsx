"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MarketingPageShell } from "@/components/MarketingPageShell";
import { ShopCartDrawer } from "@/components/shop/ShopCartDrawer";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { formatShopPrice } from "@/data/shopProducts";

type Stored = {
  orderId: string;
  totalCents?: number;
  shippingCents?: number;
  method?: string;
  shipWindow?: string;
  address?: Record<string, string>;
};

export function ShopOrderConfirmPage() {
  const search = useSearchParams();
  const orderIdParam = search.get("orderId") ?? "";
  const [stored, setStored] = useState<Stored | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("lr-shop-last-order");
      if (raw) setStored(JSON.parse(raw) as Stored);
    } catch {
      setStored(null);
    }
  }, []);

  const orderId = orderIdParam || stored?.orderId || "—";

  return (
    <MarketingPageShell backTo="/shop" backLabel="Back to collection" extraWide compactTop>
      <ShopCartDrawer />
      <ShopHeader />

      <div className="mx-auto max-w-xl text-center text-neutral-900">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">Order</p>
        <h1 className="mt-3 font-display text-2xl font-normal tracking-[0.06em] sm:text-3xl">Thank you</h1>
        <p className="mt-2 font-mono text-sm text-neutral-700">Reference · {orderId}</p>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Your shipping details and cart were captured for this preview. Fulfillment and payment will connect here when the
          operator stack goes live.
        </p>

        {stored?.totalCents != null ? (
          <div className="mt-8 rounded-2xl border border-neutral-200/90 bg-white p-6 text-left shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Summary</p>
            <p className="mt-3 text-sm">
              <span className="text-muted">Total </span>
              <span className="font-semibold tabular-nums">{formatShopPrice(stored.totalCents)}</span>
            </p>
            {stored.shippingCents != null ? (
              <p className="mt-1 text-sm text-muted">
                Shipping {stored.method ? `(${stored.method}) ` : ""}
                {formatShopPrice(stored.shippingCents)}
                {stored.shipWindow ? ` · ${stored.shipWindow}` : ""}
              </p>
            ) : null}
            {stored.address ? (
              <div className="mt-4 border-t border-neutral-100 pt-4 text-sm text-neutral-700">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Ship to</p>
                <p className="mt-2 whitespace-pre-line">
                  {[
                    stored.address.fullName,
                    stored.address.line1,
                    stored.address.line2,
                    `${stored.address.city}, ${stored.address.region} ${stored.address.postalCode}`,
                    stored.address.country,
                  ]
                    .filter(Boolean)
                    .join("\n")}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}

        <Link
          href="/shop"
          className="mt-10 inline-flex min-h-[48px] items-center justify-center rounded-full bg-neutral-900 px-8 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          Back to collection
        </Link>
      </div>
    </MarketingPageShell>
  );
}
