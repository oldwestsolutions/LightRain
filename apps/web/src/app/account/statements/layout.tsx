import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/account/statements",
  description: "LightRain statements: downloadable activity and settlement summaries for operators.",
});

export default function StatementsLayout({ children }: { children: ReactNode }) {
  return children;
}
