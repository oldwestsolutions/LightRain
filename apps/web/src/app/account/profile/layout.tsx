import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/account/profile",
  description: "LightRain account profile: identity and contact preferences for your vault session.",
});

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return children;
}
