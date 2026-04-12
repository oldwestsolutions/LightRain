"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { MarketingPageShell } from "@/components/MarketingPageShell";
import { ShopCartDrawer } from "@/components/shop/ShopCartDrawer";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { SHOP_PRODUCTS } from "@/data/shopProducts";
import { formatShopPrice } from "@/data/shopProducts";
import { SHIPPING_METHODS, shippingWindowLabel, validateShippingAddress } from "@/lib/shopShipping";
import { cartLineCount, useShopStore } from "@/store/useShopStore";

export function ShopCheckoutPage() {
  const router = useRouter();
  const lines = useShopStore((s) => s.lines);
  const shippingAddress = useShopStore((s) => s.shippingAddress);
  const shippingMethod = useShopStore((s) => s.shippingMethod);
  const setShippingAddress = useShopStore((s) => s.setShippingAddress);
  const setShippingMethod = useShopStore((s) => s.setShippingMethod);
  const clearCart = useShopStore((s) => s.clearCart);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { subtotal, resolvedLines } = useMemo(() => {
    let s = 0;
    const res: { productId: string; colorId: string; size: string; quantity: number }[] = [];
    for (const line of lines) {
      const p = SHOP_PRODUCTS.find((x) => x.id === line.productId);
      if (!p) continue;
      s += p.priceCents * line.quantity;
      res.push({
        productId: line.productId,
        colorId: line.colorId,
        size: line.size,
        quantity: line.quantity,
      });
    }
    return { subtotal: s, resolvedLines: res };
  }, [lines]);

  const method = SHIPPING_METHODS.find((m) => m.id === shippingMethod) ?? SHIPPING_METHODS[0]!;
  const shippingCents = method.priceCents;
  const totalCents = subtotal + shippingCents;

  const onCompleteOrder = () => {
    setApiError(null);
    const v = validateShippingAddress(shippingAddress);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    if (resolvedLines.length === 0) {
      setApiError("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const orderId = `LR-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(
        "lr-shop-last-order",
        JSON.stringify({
          orderId,
          totalCents,
          shippingCents,
          method: method.id,
          shipWindow: shippingWindowLabel(method),
          address: shippingAddress as Record<string, string>,
        })
      );
      clearCart();
      router.push(`/shop/order/confirm?orderId=${encodeURIComponent(orderId)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MarketingPageShell backTo="/shop/cart" backLabel="Back to cart" extraWide compactTop>
      <ShopCartDrawer />
      <ShopHeader />

      <h1 className="mb-8 font-display text-2xl font-normal tracking-[0.06em] text-neutral-900 sm:text-3xl">Checkout</h1>

      {lines.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/80 px-6 py-16 text-center">
          <p className="text-sm text-muted">Nothing to check out.</p>
          <Link href="/shop" className="mt-4 inline-block text-sm font-semibold text-neutral-900 underline">
            Return to collection
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="ship-heading">
              <h2 id="ship-heading" className="text-lg font-semibold text-neutral-900">
                Shipping
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="ship-name" className="text-xs font-medium uppercase tracking-wider text-muted">
                    Full name
                  </label>
                  <input
                    id="ship-name"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ fullName: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                    autoComplete="name"
                  />
                  {errors.fullName ? <p className="mt-1 text-xs text-red-700">{errors.fullName}</p> : null}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ship-line1" className="text-xs font-medium uppercase tracking-wider text-muted">
                    Address line 1
                  </label>
                  <input
                    id="ship-line1"
                    value={shippingAddress.line1}
                    onChange={(e) => setShippingAddress({ line1: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                    autoComplete="address-line1"
                  />
                  {errors.line1 ? <p className="mt-1 text-xs text-red-700">{errors.line1}</p> : null}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ship-line2" className="text-xs font-medium uppercase tracking-wider text-muted">
                    Address line 2 (optional)
                  </label>
                  <input
                    id="ship-line2"
                    value={shippingAddress.line2}
                    onChange={(e) => setShippingAddress({ line2: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                    autoComplete="address-line2"
                  />
                </div>
                <div>
                  <label htmlFor="ship-city" className="text-xs font-medium uppercase tracking-wider text-muted">
                    City
                  </label>
                  <input
                    id="ship-city"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ city: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                    autoComplete="address-level2"
                  />
                  {errors.city ? <p className="mt-1 text-xs text-red-700">{errors.city}</p> : null}
                </div>
                <div>
                  <label htmlFor="ship-region" className="text-xs font-medium uppercase tracking-wider text-muted">
                    State / region
                  </label>
                  <input
                    id="ship-region"
                    value={shippingAddress.region}
                    onChange={(e) => setShippingAddress({ region: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                    autoComplete="address-level1"
                  />
                  {errors.region ? <p className="mt-1 text-xs text-red-700">{errors.region}</p> : null}
                </div>
                <div>
                  <label htmlFor="ship-zip" className="text-xs font-medium uppercase tracking-wider text-muted">
                    Postal code
                  </label>
                  <input
                    id="ship-zip"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ postalCode: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                    autoComplete="postal-code"
                  />
                  {errors.postalCode ? <p className="mt-1 text-xs text-red-700">{errors.postalCode}</p> : null}
                </div>
                <div>
                  <label htmlFor="ship-country" className="text-xs font-medium uppercase tracking-wider text-muted">
                    Country
                  </label>
                  <input
                    id="ship-country"
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ country: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm"
                    autoComplete="country"
                  />
                  {errors.country ? <p className="mt-1 text-xs text-red-700">{errors.country}</p> : null}
                </div>
              </div>

              <fieldset className="mt-8">
                <legend className="text-xs font-semibold uppercase tracking-wider text-muted">Shipping method</legend>
                <div className="mt-3 space-y-2">
                  {SHIPPING_METHODS.map((m) => (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${
                        shippingMethod === m.id ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="ship-method"
                        checked={shippingMethod === m.id}
                        onChange={() => setShippingMethod(m.id)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold text-neutral-900">{m.label}</p>
                        <p className="text-sm text-muted">
                          {formatShopPrice(m.priceCents)} · {shippingWindowLabel(m)}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>
            </section>
          </div>

          <aside className="h-fit space-y-4 rounded-2xl border border-neutral-200/90 bg-neutral-50/90 p-6 shadow-inner">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Order summary</h2>
            <p className="text-sm text-muted">{cartLineCount(lines)} items</p>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-medium tabular-nums">{formatShopPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Shipping ({method.label})</span>
              <span className="font-medium tabular-nums">{formatShopPrice(shippingCents)}</span>
            </div>
            <div className="border-t border-neutral-200 pt-3">
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="tabular-nums">{formatShopPrice(totalCents)}</span>
              </div>
              <p className="mt-2 text-xs text-muted">Totals in USD. Payment collection is not enabled on this preview.</p>
            </div>
            {apiError ? <p className="text-sm text-red-700">{apiError}</p> : null}
            <button
              type="button"
              disabled={loading}
              onClick={onCompleteOrder}
              className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? "Submitting…" : "Place order"}
            </button>
          </aside>
        </div>
      )}
    </MarketingPageShell>
  );
}
