import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/whitepaper",
  description:
    "LightRain whitepaper: conceptual security model—local-first identity, operator-controlled keys, hardware-backed recovery, and no pooled omnibus story—in plain language.",
});

export default function WhitepaperLayout({ children }: { children: ReactNode }) {
  return children;
}
