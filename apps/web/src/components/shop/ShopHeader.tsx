"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { URL_SHOP } from "@/lib/site";
import { cartLineCount, useShopStore } from "@/store/useShopStore";

const SHOP_HOST = URL_SHOP.replace(/^https:\/\//, "");

export function ShopHeader() {
  const lines = useShopStore((s) => s.lines);
  const openDrawer = useShopStore((s) => s.openDrawer);
  const n = cartLineCount(lines);

  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200/90 pb-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">{SHOP_HOST}</p>
        <Link
          href="/shop"
          className="mt-1 inline-block font-display text-xl font-normal tracking-[0.08em] text-neutral-900 transition-colors hover:text-accent sm:text-2xl"
        >
          LightRain Collection
        </Link>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/shop/cart"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50"
        >
          Cart
        </Link>
        <button
          type="button"
          onClick={openDrawer}
          className="relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
          aria-label={`Open bag, ${n} items`}
        >
          <ShoppingBag className="h-4 w-4 sm:mr-2" aria-hidden />
          <span className="hidden sm:inline">Bag</span>
          {n > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-neutral-900">
              {n > 99 ? "99+" : n}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  );
}
