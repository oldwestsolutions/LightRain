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
  size = "default",
}: {
  product: ShopProduct;
  searchQuery?: string;
  size?: "default" | "compact";
}) {
  const reduceMotion = useReducedMotion();
  const sold = product.availability === "sold_out";
  const compact = size === "compact";

  return (
    <motion.article
      initial={false}
      whileHover={reduceMotion || compact ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`group flex flex-col ${sold ? "opacity-60" : ""}`}
    >
      <Link
        href={`/shop/product/${product.slug}`}
        className={`block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 ${compact ? "focus-visible:ring-offset-1" : ""}`}
      >
        <ShopProductImage
          product={product}
          aspectClass={compact ? "aspect-square" : "aspect-[3/4]"}
          slugChars={compact ? 16 : 24}
          slugTextClass={compact ? "bottom-2 left-2 right-2 text-[8px] tracking-[0.14em]" : undefined}
        />
        <div className={compact ? "mt-1.5 space-y-0.5" : "mt-3 space-y-1"}>
          <div className={`flex flex-wrap items-center ${compact ? "gap-1" : "gap-2"}`}>
            {product.limitedDrop ? (
              <span
                className={
                  compact
                    ? "rounded-full border border-amber-700/40 bg-amber-50 px-1.5 py-px text-[8px] font-semibold uppercase tracking-wider text-amber-900"
                    : "rounded-full border border-amber-700/40 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-900"
                }
              >
                Limited
              </span>
            ) : null}
            {product.availability === "limited" ? (
              <span
                className={
                  compact
                    ? "text-[8px] font-medium uppercase tracking-wider text-muted"
                    : "text-[10px] font-medium uppercase tracking-wider text-muted"
                }
              >
                Low stock
              </span>
            ) : null}
            {sold ? (
              <span
                className={
                  compact
                    ? "text-[8px] font-medium uppercase tracking-wider text-red-700"
                    : "text-[10px] font-medium uppercase tracking-wider text-red-700"
                }
              >
                Sold out
              </span>
            ) : null}
          </div>
          <h3
            className={
              compact
                ? "text-[11px] font-semibold leading-tight text-neutral-900"
                : "text-sm font-semibold leading-snug text-neutral-900 sm:text-base"
            }
          >
            <Highlight text={product.name} query={searchQuery} />
          </h3>
          <p
            className={
              compact
                ? "line-clamp-2 text-[10px] leading-snug text-muted"
                : "line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm"
            }
          >
            <Highlight text={product.tagline} query={searchQuery} />
          </p>
          <div className={`flex flex-wrap items-baseline gap-1.5 ${compact ? "pt-0.5" : "pt-1"}`}>
            <span
              className={
                compact
                  ? "text-xs font-semibold tabular-nums text-neutral-900"
                  : "text-base font-semibold tabular-nums text-neutral-900"
              }
            >
              {formatShopPrice(product.priceCents)}
            </span>
            {product.compareAtCents ? (
              <span className={compact ? "text-[10px] text-muted line-through" : "text-sm text-muted line-through"}>
                {formatShopPrice(product.compareAtCents)}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
