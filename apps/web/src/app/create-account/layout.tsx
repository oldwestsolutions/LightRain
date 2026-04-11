import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";

export const metadata = routeMeta({
  path: "/create-account",
  description:
    "Create a LightRain secure vault: email sign-in, strong password, 2FA, trusted device binding, and recovery you control—Bitcoin payments–grade onboarding.",
});

export default function CreateAccountLayout({ children }: { children: ReactNode }) {
  return children;
}
