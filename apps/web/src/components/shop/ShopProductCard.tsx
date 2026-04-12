"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ShopProduct } from "@/data/shopProducts";
import { formatShopPrice } from "@/data/shopProducts";
import { highlightRanges } from "@/lib/shopSearch";
import { ShopProductImage } from "./ShopProductImage";

function Highlight({ text, query }: { text: string; query: string }) {
  const ranges = highlightRanges(text, query);
  if (!query.trim() || ranges.length === 0) return <>{text}</>;
  const { start, end } = ranges[0]!;
  return (
    <>
      {text.slice(0, start)}
      <mark className="rounded-sm bg-amber-200/90 px-0.5 text-neutral-900">{text.slice(start, end)}</mark>
      {text.slice(end)}
    </>
  );
}

export function ShopProductCard({
  product,
  searchQuery = "",
}: {
  product: ShopProduct;
  searchQuery?: string;
}) {
  const reduceMotion = useReducedMotion();
  const sold = product.availability === "sold_out";

  return (
    <motion.article
      initial={false}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`group flex flex-col ${sold ? "opacity-60" : ""}`}
    >
      <Link href={`/shop/product/${product.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-xl">
        <ShopProductImage product={product} />
        <div className="mt-3 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            {product.limitedDrop ? (
              <span className="rounded-full border border-amber-700/40 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-900">
                Limited
              </span>
            ) : null}
            {product.availability === "limited" ? (
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted">Low stock</span>
            ) : null}
            {sold ? (
              <span className="text-[10px] font-medium uppercase tracking-wider text-red-700">Sold out</span>
            ) : null}
          </div>
          <h3 className="text-sm font-semibold leading-snug text-neutral-900 sm:text-base">
            <Highlight text={product.name} query={searchQuery} />
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm">
            <Highlight text={product.tagline} query={searchQuery} />
          </p>
          <div className="flex flex-wrap items-baseline gap-2 pt-1">
            <span className="text-base font-semibold tabular-nums text-neutral-900">{formatShopPrice(product.priceCents)}</span>
            {product.compareAtCents ? (
              <span className="text-sm text-muted line-through">{formatShopPrice(product.compareAtCents)}</span>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
