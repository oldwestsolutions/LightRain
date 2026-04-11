import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/assurance-layers",
  description:
    "LightRain assurance layers: ML-assisted signals for federation addressing, baselines, device and key anomalies, policy-aligned warnings, execution integrity, and evidence-grade logging—operator-assist only, not automated compliance.",
});

export default function AssuranceLayersLayout({ children }: { children: ReactNode }) {
  return children;
}
