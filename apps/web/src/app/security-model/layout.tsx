import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/security-model",
  description:
    "LightRain security model in plain language: local-first identity, operator-controlled keys, hardware-backed recovery, and no pooled omnibus narrative for the public wallet story.",
});

export default function SecurityModelLayout({ children }: { children: ReactNode }) {
  return children;
}
