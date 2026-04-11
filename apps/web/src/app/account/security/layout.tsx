import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/account/security",
  description: "LightRain security settings: sessions, 2FA posture, and device trust for your Bitcoin payments vault.",
});

export default function SecurityLayout({ children }: { children: ReactNode }) {
  return children;
}
