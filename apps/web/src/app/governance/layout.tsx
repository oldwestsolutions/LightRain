import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/governance",
  description:
    "LightRain governance and risk posture: custody boundaries, licensed-entity obligations, federation auditability, and how we avoid overpromising—orientation only, not legal advice.",
});

export default function GovernanceLayout({ children }: { children: ReactNode }) {
  return children;
}
