"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SHOP_PRODUCTS } from "@/data/shopProducts";
import { formatShopPrice } from "@/data/shopProducts";
import { cartLineCount, useShopStore } from "@/store/useShopStore";

export function ShopCartDrawer() {
  const open = useShopStore((s) => s.drawerOpen);
  const closeDrawer = useShopStore((s) => s.closeDrawer);
  const lines = useShopStore((s) => s.lines);
  const setLineQty = useShopStore((s) => s.setLineQty);
  const removeLine = useShopStore((s) => s.removeLine);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeDrawer]);

  let subtotal = 0;
  const rows = lines.map((line) => {
    const p = SHOP_PRODUCTS.find((x) => x.id === line.productId);
    if (!p) return null;
    const color = p.colors.find((c) => c.id === line.colorId)?.label ?? line.colorId;
    subtotal += p.priceCents * line.quantity;
    return { line, p, color };
  });

  const slide = reduceMotion
    ? { initial: false, animate: { x: 0 }, exit: { x: "100%" } }
    : {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { type: "spring" as const, stiffness: 420, damping: 38 },
      };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[110]">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[2px]"
            aria-label="Close cart"
            onClick={closeDrawer}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-neutral-200/90 bg-white shadow-2xl"
            {...slide}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-4 sm:px-5">
              <h2 id="cart-drawer-title" className="text-lg font-semibold text-neutral-900">
                Bag · {cartLineCount(lines)} items
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-muted hover:bg-neutral-100 hover:text-neutral-900"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-sm font-medium text-neutral-800">Your bag is empty</p>
                  <p className="mt-2 max-w-xs text-sm text-muted">Browse the collection and add pieces when ready.</p>
                  <Link
                    href="/shop"
                    onClick={closeDrawer}
                    className="mt-6 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                  >
                    Continue shopping
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {rows.map((row) =>
                    row ? (
                      <li key={row.line.key} className="flex gap-3 rounded-xl border border-neutral-100 bg-neutral-50/80 p-3">
                        <div className="h-20 w-16 shrink-0 rounded-lg bg-neutral-200" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-neutral-900">{row.p.name}</p>
                          <p className="text-xs text-muted">
                            {row.color} · {row.line.size}
                          </p>
                          <p className="mt-1 text-sm font-medium tabular-nums">{formatShopPrice(row.p.priceCents)}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <label className="sr-only" htmlFor={`qty-${row.line.key}`}>
                              Quantity
                            </label>
                            <input
                              id={`qty-${row.line.key}`}
                              type="number"
                              min={1}
                              max={99}
                              value={row.line.quantity}
                              onChange={(e) => setLineQty(row.line.key, Number(e.target.value))}
                              className="w-14 rounded-lg border border-neutral-200 bg-white px-2 py-1 text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => removeLine(row.line.key)}
                              className="text-xs font-medium text-red-700 underline-offset-2 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </div>

            {lines.length > 0 ? (
              <div className="border-t border-neutral-100 bg-white p-4 sm:p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-semibold tabular-nums text-neutral-900">{formatShopPrice(subtotal)}</span>
                </div>
                <p className="mt-2 text-xs text-muted">Shipping and tax calculated at checkout.</p>
                <Link
                  href="/shop/cart"
                  onClick={closeDrawer}
                  className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  View cart
                </Link>
                <Link
                  href="/shop/checkout"
                  onClick={closeDrawer}
                  className="mt-2 flex min-h-[48px] w-full items-center justify-center rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  Checkout
                </Link>
              </div>
            ) : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
