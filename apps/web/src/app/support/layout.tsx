import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/support",
  description:
    "LightRain support: phone and email for settlement and federation questions, plus a guided assistant. Bitcoin payments–grade help for operators.",
});

export default function SupportLayout({ children }: { children: ReactNode }) {
  return children;
}
