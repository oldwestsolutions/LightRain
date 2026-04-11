import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/dashboard",
  description:
    "LightRain operator dashboard: federation address, settlement history, and vault controls for your private Bitcoin ledger.",
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return children;
}
