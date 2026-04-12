"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MarketingPageShell } from "@/components/MarketingPageShell";
import { ShopCartDrawer } from "@/components/shop/ShopCartDrawer";
import { ShopCatalogControls } from "@/components/shop/ShopCatalogControls";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopHero } from "@/components/shop/ShopHero";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { SHOP_CATEGORIES, SHOP_PRODUCTS } from "@/data/shopProducts";
import { defaultShopFilters, filterAndSortProducts, type ShopFilters } from "@/lib/shopSearch";

export function ShopPage() {
  const [filters, setFilters] = useState<ShopFilters>(() => defaultShopFilters());

  const filtered = useMemo(() => filterAndSortProducts(SHOP_PRODUCTS, filters), [filters]);

  const featuredDrop = useMemo(
    () => SHOP_PRODUCTS.filter((p) => p.limitedDrop || (p.featured && p.category === "limited")),
    []
  );

  const browsingDefault =
    !filters.query.trim() &&
    filters.categories.length === 0 &&
    filters.priceMinCents == null &&
    filters.priceMaxCents == null &&
    filters.availability.length === 0 &&
    filters.sort === "popular";

  return (
    <MarketingPageShell backTo="/" backLabel="Back to sign in" extraWide>
      <ShopCartDrawer />
      <ShopHeader />
      <ShopHero />

      <section className="mb-14 rounded-2xl border border-neutral-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-black/[0.02] sm:p-8" aria-labelledby="shop-controls-heading">
        <h2 id="shop-controls-heading" className="sr-only">
          Search and filters
        </h2>
        <ShopCatalogControls filters={filters} onChange={setFilters} resultCount={filtered.length} />
      </section>

      {featuredDrop.length > 0 ? (
        <section className="mb-16" aria-labelledby="featured-drop-heading">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Featured drop</p>
              <h2 id="featured-drop-heading" className="mt-2 font-display text-2xl font-normal tracking-[0.06em] text-neutral-900">
                Limited runway
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted">Low-run pieces and air-gapped-grade objects. When inventory clears, SKUs do not restock on the same spec.</p>
            </div>
            <Link href="/shop/product/lightrain-genesis-drop-jacket" className="text-sm font-semibold text-neutral-900 underline-offset-2 hover:underline">
              View Genesis jacket
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDrop.map((p) => (
              <ShopProductCard key={p.id} product={p} searchQuery="" />
            ))}
          </div>
        </section>
      ) : null}

      {browsingDefault
        ? SHOP_CATEGORIES.map((cat) => {
            const inCat = SHOP_PRODUCTS.filter((p) => p.category === cat.id);
            if (inCat.length === 0) return null;
            return (
              <section key={cat.id} id={`shop-cat-${cat.id}`} className="mb-14 scroll-mt-28" aria-labelledby={`heading-${cat.id}`}>
                <h2 id={`heading-${cat.id}`} className="font-display text-xl font-normal tracking-[0.06em] text-neutral-900 sm:text-2xl">
                  {cat.label}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted">{cat.blurb}</p>
                <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {inCat.map((p) => (
                    <ShopProductCard key={p.id} product={p} searchQuery="" />
                  ))}
                </div>
              </section>
            );
          })
        : null}

      {!browsingDefault ? (
        <section className="mb-8" aria-labelledby="all-grid-heading">
          <h2 id="all-grid-heading" className="font-display text-xl font-normal tracking-[0.06em] text-neutral-900 sm:text-2xl">
            Results
          </h2>
          <p className="mt-2 text-sm text-muted">Filtered and sorted set.</p>
          {filtered.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/80 px-6 py-16 text-center">
              <p className="text-sm font-medium text-neutral-800">Nothing in view</p>
              <p className="mt-2 text-sm text-muted">Adjust filters or search to widen the set.</p>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ShopProductCard key={p.id} product={p} searchQuery={filters.query} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <p className="mb-10 text-center text-sm text-muted">
          Refine with search, categories, price, availability, or sort — a results grid appears when anything is active.
        </p>
      )}

      <p className="rounded-xl border border-neutral-200/80 bg-white/60 p-4 text-center text-xs text-muted">
        Prefer this URL? Point <strong className="font-medium text-neutral-700">shop.lightra.in</strong> at this site
        (same app, <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">/shop</code>) when your DNS is ready.
      </p>
    </MarketingPageShell>
  );
}
