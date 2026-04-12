"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MarketingPageShell } from "@/components/MarketingPageShell";
import { ShopCartDrawer } from "@/components/shop/ShopCartDrawer";
import { ShopCatalogControls } from "@/components/shop/ShopCatalogControls";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ShopSubFooter } from "@/components/shop/ShopSubFooter";
import { SHOP_CATEGORIES, SHOP_PRODUCTS } from "@/data/shopProducts";
import { defaultShopFilters, filterAndSortProducts, type ShopFilters } from "@/lib/shopSearch";

/** Catalog sections exclude Limited Drops; those SKUs surface only in Featured runway. */
const CATALOG_CATEGORIES = SHOP_CATEGORIES.filter((c) => c.id !== "limited");

/** Featured runway row: Genesis plus one companion piece. */
const RUNWAY_SLUGS = ["lightrain-genesis-drop-jacket", "lightrain-drizzle-jacket"] as const;

const productGridClass =
  "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5";

export function ShopPage() {
  const [filters, setFilters] = useState<ShopFilters>(() => defaultShopFilters());

  const filtered = useMemo(() => filterAndSortProducts(SHOP_PRODUCTS, filters), [filters]);

  const runwayProducts = useMemo(
    () =>
      RUNWAY_SLUGS.map((slug) => SHOP_PRODUCTS.find((p) => p.slug === slug)).filter(
        (p): p is NonNullable<typeof p> => p != null
      ),
    []
  );

  const grouped = useMemo(
    () =>
      CATALOG_CATEGORIES.map((cat) => ({
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

        <section
          className="mb-8 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
          aria-labelledby="shop-controls-heading"
        >
          <h2 id="shop-controls-heading" className="sr-only">
            Search and filters
          </h2>
          <ShopCatalogControls filters={filters} onChange={setFilters} resultCount={filtered.length} />
        </section>

        {runwayProducts.length > 0 ? (
          <section className="mb-8 sm:mb-10" aria-labelledby="featured-drop-heading">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Featured drop</p>
                <h2
                  id="featured-drop-heading"
                  className="mt-1 font-display text-lg font-normal tracking-[0.06em] text-neutral-900 sm:text-xl"
                >
                  Limited runway
                </h2>
                <p className="mt-1 max-w-md text-xs text-muted sm:text-sm">
                  Low-run pieces and air-gapped-grade objects. When inventory clears, SKUs do not restock on the same spec.
                </p>
              </div>
              <Link
                href="/shop/product/lightrain-genesis-drop-jacket"
                className="text-xs font-semibold text-neutral-900 underline-offset-2 hover:underline sm:text-sm"
              >
                View Genesis jacket
              </Link>
            </div>
            <div className={`${productGridClass} max-w-lg sm:max-w-xl`}>
              {runwayProducts.map((p) => (
                <ShopProductCard key={p.id} product={p} searchQuery={filters.query} size="compact" />
              ))}
            </div>
          </section>
        ) : null}

        {filtered.length === 0 ? (
          <section className="mb-12 rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-base font-medium text-neutral-900">No products match</p>
            <p className="mt-2 text-sm text-muted">
              Clear search or filters to see the full LightRain Collection.
            </p>
          </section>
        ) : grouped.length > 0 ? (
          <div className="space-y-12 pb-6 sm:space-y-14 sm:pb-8">
            {grouped.map((g) => (
              <section key={g.id} id={`shop-cat-${g.id}`} className="scroll-mt-28" aria-labelledby={`heading-${g.id}`}>
                <h2
                  id={`heading-${g.id}`}
                  className="font-display text-lg font-normal tracking-[0.06em] text-neutral-900 sm:text-xl md:text-2xl"
                >
                  {g.label}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted">{g.blurb}</p>
                <div className={`mt-5 ${productGridClass}`}>
                  {g.items.map((p) => (
                    <ShopProductCard key={p.id} product={p} searchQuery={filters.query} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <section className="space-y-12 pb-6 sm:space-y-14 sm:pb-8" aria-labelledby="shop-fallback-heading">
            <h2
              id="shop-fallback-heading"
              className="font-display text-lg font-normal tracking-[0.06em] text-neutral-900 sm:text-xl md:text-2xl"
            >
              Matching pieces
            </h2>
            <p className="max-w-2xl text-sm text-muted">
              Limited-run SKUs appear above in Featured drop; your filters still match these items.
            </p>
            <div className={`mt-5 ${productGridClass}`}>
              {filtered.map((p) => (
                <ShopProductCard key={p.id} product={p} searchQuery={filters.query} />
              ))}
            </div>
          </section>
        )}

        <ShopSubFooter />
      </div>
    </MarketingPageShell>
  );
}
