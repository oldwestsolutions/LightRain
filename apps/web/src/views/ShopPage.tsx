"use client";

import Link from "next/link";
import { useMemo } from "react";
import { MarketingPageShell } from "@/components/MarketingPageShell";
import { ShopCartDrawer } from "@/components/shop/ShopCartDrawer";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { SHOP_CATEGORIES, SHOP_PRODUCTS } from "@/data/shopProducts";
import { defaultShopFilters, filterAndSortProducts } from "@/lib/shopSearch";

/** Featured runway row: Genesis plus one companion piece for a two-up visual. */
const RUNWAY_SLUGS = ["lightrain-genesis-drop-jacket", "lightrain-drizzle-jacket"] as const;

export function ShopPage() {
  const filtered = useMemo(() => filterAndSortProducts(SHOP_PRODUCTS, defaultShopFilters()), []);

  const runwayProducts = useMemo(
    () =>
      RUNWAY_SLUGS.map((slug) => SHOP_PRODUCTS.find((p) => p.slug === slug)).filter(
        (p): p is NonNullable<typeof p> => p != null
      ),
    []
  );

  /** One section per category — only categories that still have products after filters/search/sort. */
  const grouped = useMemo(
    () =>
      SHOP_CATEGORIES.map((cat) => ({
        ...cat,
        items: filtered.filter((p) => p.category === cat.id),
      })).filter((g) => g.items.length > 0),
    [filtered]
  );

  return (
    <MarketingPageShell
      backTo="/"
      backLabel="Back to sign in"
      extraWide
      compactTop
      allowStickyDescendants
    >
      <div className="relative isolate min-w-0 text-neutral-900">
        <ShopCartDrawer />
        <ShopHeader />

        {runwayProducts.length > 0 ? (
          <section className="mb-10 sm:mb-12" aria-labelledby="featured-drop-heading">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Featured drop</p>
                <h2
                  id="featured-drop-heading"
                  className="mt-2 font-display text-2xl font-normal tracking-[0.06em] text-neutral-900"
                >
                  Limited runway
                </h2>
                <p className="mt-2 max-w-xl text-sm text-muted">
                  Low-run pieces and air-gapped-grade objects. When inventory clears, SKUs do not restock on the same spec.
                </p>
              </div>
              <Link
                href="/shop/product/lightrain-genesis-drop-jacket"
                className="text-sm font-semibold text-neutral-900 underline-offset-2 hover:underline"
              >
                View Genesis jacket
              </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {runwayProducts.map((p) => (
                <ShopProductCard key={p.id} product={p} searchQuery="" />
              ))}
            </div>
          </section>
        ) : null}

        {filtered.length === 0 ? (
          <section className="mb-12 rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-base font-medium text-neutral-900">No products match</p>
            <p className="mt-2 text-sm text-muted">Check back soon for new SKUs in the LightRain Collection.</p>
          </section>
        ) : (
          <div className="space-y-14 pb-8">
            {grouped.map((g) => (
              <section key={g.id} id={`shop-cat-${g.id}`} className="scroll-mt-28" aria-labelledby={`heading-${g.id}`}>
                <h2
                  id={`heading-${g.id}`}
                  className="font-display text-xl font-normal tracking-[0.06em] text-neutral-900 sm:text-2xl"
                >
                  {g.label}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted">{g.blurb}</p>
                <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {g.items.map((p) => (
                    <ShopProductCard key={p.id} product={p} searchQuery="" />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <p className="rounded-xl border border-neutral-200 bg-white p-4 text-center text-xs text-muted shadow-sm">
          Prefer this URL? Point <strong className="font-medium text-neutral-800">shop.lightra.in</strong> at this site
          (same app, <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">/shop</code>) when your DNS is ready.
        </p>
      </div>
    </MarketingPageShell>
  );
}
