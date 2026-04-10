import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/shop",
  description:
    "LightRain shop: cold wallets, air-gapped signers, physical security, and Bitcoin merch—curated for self-custody operators.",
});

export default function ShopLayout({ children }: { children: ReactNode }) {
  return children;
}
