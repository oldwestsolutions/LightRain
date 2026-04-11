import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/governance-risk",
  description:
    "LightRain governance and risk posture: custody boundaries, licensed-entity obligations, federation auditability, and how we avoid overpromising—orientation only, not legal advice.",
});

export default function GovernanceRiskLayout({ children }: { children: ReactNode }) {
  return children;
}
