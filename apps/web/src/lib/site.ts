/** Canonical marketing origin (no trailing slash). Override with NEXT_PUBLIC_SITE_URL in production. */
export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return "https://lightra.in";
}

export const URL_SUPPORT = "https://support.lightra.in";
export const URL_COMPANY = "https://company.lightra.in";
export const URL_SHOP = "https://shop.lightra.in";

/** Browser tab + default document title (fixed for all routes). */
export const SITE_TAB_TITLE = "LightRain | Bitcoin";

export const SITE_SEO_DESCRIPTION =
  "LightRain is a private Bitcoin ledger: federation addressing, settlement context, and discretionary rails built for operators who need legible compliance surfaces.";
