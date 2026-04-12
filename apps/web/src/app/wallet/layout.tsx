import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";
import { WalletShell } from "./WalletShell";

export const metadata = routeMeta({
  path: "/wallet",
  description:
    "LightRain wallet hub: search and discovery over your discretionary ledger session, without leaving the main app.",
});

export default function WalletLayout({ children }: { children: ReactNode }) {
  return <WalletShell>{children}</WalletShell>;
}
