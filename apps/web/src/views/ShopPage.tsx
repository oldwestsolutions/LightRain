"use client";

import { MarketingPageShell } from "@/components/MarketingPageShell";

export function ShopPage() {
  return (
    <MarketingPageShell backTo="/" backLabel="Back to sign in" wide>
      <h1 className="sr-only">Shop</h1>
    </MarketingPageShell>
  );
}
