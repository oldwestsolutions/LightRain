import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/shop",
  description:
    "LightRain Collection: operator-grade apparel, hardware, tech accessories, and limited drops—curated in the Lightra.in design language.",
});

export default function ShopLayout({ children }: { children: ReactNode }) {
  return children;
}
