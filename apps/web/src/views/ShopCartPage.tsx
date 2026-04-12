"use client";

import Link from "next/link";
import { MarketingPageShell } from "@/components/MarketingPageShell";
import { ShopCartDrawer } from "@/components/shop/ShopCartDrawer";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { SHOP_PRODUCTS } from "@/data/shopProducts";
import { formatShopPrice } from "@/data/shopProducts";
import { useShopStore } from "@/store/useShopStore";

export function ShopCartPage() {
  const lines = useShopStore((s) => s.lines);
  const setLineQty = useShopStore((s) => s.setLineQty);
  const removeLine = useShopStore((s) => s.removeLine);

  let subtotal = 0;
  const rows = lines
    .map((line) => {
      const p = SHOP_PRODUCTS.find((x) => x.id === line.productId);
      if (!p) return null;
      subtotal += p.priceCents * line.quantity;
      const color = p.colors.find((c) => c.id === line.colorId)?.label ?? line.colorId;
      return { line, p, color };
    })
    .filter(Boolean) as { line: (typeof lines)[0]; p: (typeof SHOP_PRODUCTS)[0]; color: string }[];

  return (
    <MarketingPageShell backTo="/shop" backLabel="Back to collection" extraWide>
      <ShopCartDrawer />
      <ShopHeader />

      <h1 className="mb-8 font-display text-2xl font-normal tracking-[0.06em] text-neutral-900 sm:text-3xl">Cart</h1>

      {lines.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/80 px-6 py-20 text-center">
          <p className="text-sm font-medium text-neutral-800">Your cart is empty</p>
          <p className="mt-2 text-sm text-muted">Add pieces from the collection, then return here to ship.</p>
          <Link
            href="/shop"
            className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full bg-neutral-900 px-8 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Shop collection
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <ul className="space-y-4">
            {rows.map(({ line, p, color }) => (
              <li key={line.key} className="flex flex-wrap gap-4 rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-sm sm:flex-nowrap sm:items-center">
                <div className="h-24 w-20 shrink-0 rounded-xl bg-neutral-200" />
                <div className="min-w-0 flex-1">
                  <Link href={`/shop/product/${p.slug}`} className="font-semibold text-neutral-900 hover:underline">
                    {p.name}
                  </Link>
                  <p className="text-sm text-muted">
                    {color} · {line.size}
                  </p>
                  <p className="mt-1 font-medium tabular-nums">{formatShopPrice(p.priceCents)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="sr-only" htmlFor={`cart-qty-${line.key}`}>
                    Quantity
                  </label>
                  <input
                    id={`cart-qty-${line.key}`}
                    type="number"
                    min={1}
                    max={99}
                    value={line.quantity}
                    onChange={(e) => setLineQty(line.key, Number(e.target.value))}
                    className="w-16 rounded-lg border border-neutral-200 px-2 py-1.5 text-sm"
                  />
                  <button type="button" onClick={() => removeLine(line.key)} className="text-sm font-medium text-red-700 hover:underline">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-neutral-200/90 bg-neutral-50/90 p-6 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Summary</p>
            <p className="mt-4 flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold tabular-nums">{formatShopPrice(subtotal)}</span>
            </p>
            <p className="mt-2 text-xs text-muted">Shipping and tax at checkout.</p>
            <Link
              href="/shop/checkout"
              className="mt-6 flex min-h-[48px] w-full items-center justify-center rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Proceed to checkout
            </Link>
            <Link href="/shop" className="mt-3 block text-center text-sm font-medium text-neutral-700 hover:underline">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </MarketingPageShell>
  );
}
