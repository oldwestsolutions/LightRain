import type { Metadata } from "next";
import { getSiteOrigin, SITE_TAB_TITLE } from "./site";

type RouteMetaInput = {
  /** Path including leading slash, e.g. "/support" */
  path: string;
  description: string;
};

/**
 * Per-route SEO without changing the document title (root title stays fixed).
 */
export function routeMeta({ path, description }: RouteMetaInput): Metadata {
  const base = getSiteOrigin().replace(/\/$/, "");
  const url = path === "/" ? `${base}/` : `${base}${path}`;

  return {
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: SITE_TAB_TITLE,
      description,
      siteName: "LightRain",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TAB_TITLE,
      description,
    },
  };
}
