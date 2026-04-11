import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/company",
  description:
    "LightRain company: Bitcoin payments infrastructure—federation-native settlement, discretionary rails, and operator-grade surfaces for regulated and high-risk commerce.",
});

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return children;
}
