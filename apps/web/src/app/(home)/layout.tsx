import type { ReactNode } from "react";
import { routeMeta } from "@/lib/routeMeta";
import { SITE_SEO_DESCRIPTION } from "@/lib/site";

export const metadata = routeMeta({
  path: "/",
  description: SITE_SEO_DESCRIPTION,
});

export default function HomeSegmentLayout({ children }: { children: ReactNode }) {
  return children;
}
