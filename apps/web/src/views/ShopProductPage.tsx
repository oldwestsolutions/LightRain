"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarketingPageShell } from "@/components/MarketingPageShell";
import { ShopCartDrawer } from "@/components/shop/ShopCartDrawer";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopProductImage } from "@/components/shop/ShopProductImage";
import type { ShopProduct } from "@/data/shopProducts";
import { formatShopPrice } from "@/data/shopProducts";
import { useShopStore } from "@/store/useShopStore";

export function ShopProductPage({ product }: { product: ShopProduct }) {
  const router = useRouter();
  const addToCart = useShopStore((s) => s.addToCart);
  const [colorId, setColorId] = useState(product.colors[0]?.id ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const sold = product.availability === "sold_out";

  const handleAdd = (goCheckout: boolean) => {
    if (sold || !colorId || !size) return;
    addToCart({ productId: product.id, colorId, size, quantity: 1 });
    if (goCheckout) router.push("/shop/checkout");
  };

  return (
    <MarketingPageShell backTo="/shop" backLabel="Back to collection" extraWide>
      <ShopCartDrawer />
      <ShopHeader />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <ShopProductImage product={product} aspectClass="aspect-[3/4] lg:aspect-[4/5]" className="lg:rounded-2xl" />
        </div>

        <div className="flex flex-col">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{product.category}</p>
          <h1 className="mt-2 font-display text-3xl font-normal tracking-[0.05em] text-neutral-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-neutral-700">{product.tagline}</p>
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-2xl font-semibold tabular-nums text-neutral-900">{formatShopPrice(product.priceCents)}</span>
            {product.compareAtCents ? (
              <span className="text-lg text-muted line-through">{formatShopPrice(product.compareAtCents)}</span>
            ) : null}
          </div>
          {product.limitedDrop ? (
            <p className="mt-3 text-sm font-medium text-amber-900">Limited edition · serialized batch</p>
          ) : null}
          {product.availability === "limited" ? (
            <p className="mt-1 text-sm text-muted">Low stock — ship window may extend during runs.</p>
          ) : null}
          {sold ? <p className="mt-3 text-sm font-semibold text-red-800">Sold out</p> : null}

          <div className="mt-8 space-y-6 border-t border-neutral-200 pt-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Color</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    disabled={sold}
                    onClick={() => setColorId(c.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                      colorId === c.id
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300"
                    }`}
                  >
                    <span className="h-4 w-4 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: c.hex }} aria-hidden />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="product-size" className="text-xs font-semibold uppercase tracking-wider text-muted">
                Size / variant
              </label>
              <select
                id="product-size"
                disabled={sold}
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="mt-2 w-full max-w-xs rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm"
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={sold}
              onClick={() => handleAdd(false)}
              className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-xl border border-neutral-900 bg-white px-6 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add to bag
            </button>
            <button
              type="button"
              disabled={sold}
              onClick={() => handleAdd(true)}
              className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-xl bg-neutral-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Buy now · BTCPay
            </button>
          </div>
          <p className="mt-3 text-xs text-muted">
            Checkout opens a BTCPay Server invoice when configured; otherwise you&apos;ll see a confirmation with next steps.
          </p>

          <div className="mt-12 space-y-6 text-sm leading-relaxed text-neutral-700">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Description</h2>
              <p className="mt-2">{product.longDescription}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Materials</h2>
              <p className="mt-2">{product.materials}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Sizing</h2>
              <p className="mt-2">{product.sizing}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Shipping</h2>
              <p className="mt-2">{product.shippingNote}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Care</h2>
              <p className="mt-2">{product.care}</p>
            </div>
          </div>

          <Link href="/shop" className="mt-10 inline-flex text-sm font-semibold text-neutral-900 underline-offset-2 hover:underline">
            ← Back to collection
          </Link>
        </div>
      </div>
    </MarketingPageShell>
  );
}
