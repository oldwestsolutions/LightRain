import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site";

const PATHS = [
  "/",
  "/support",
  "/company",
  "/governance",
  "/whitepaper",
  "/shop",
  "/legal",
  "/marketplace",
  "/create-account",
  "/dashboard",
  "/account/profile",
  "/account/security",
  "/account/statements",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();
  return PATHS.map((path) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.72,
  }));
}
