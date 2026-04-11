import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/legal",
  description:
    "LightRain legal center: policies, terms, and compliance downloads for production evaluation of the Bitcoin payments ledger platform.",
});

export default function LegalLayout({ children }: { children: ReactNode }) {
  return children;
}
