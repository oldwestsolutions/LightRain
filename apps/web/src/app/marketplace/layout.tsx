import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/marketplace",
  description:
    "LightRain marketplace: discover merchants and settlement-ready commerce on discretionary blockchain rails.",
});

export default function MarketplaceLayout({ children }: { children: ReactNode }) {
  return children;
}
