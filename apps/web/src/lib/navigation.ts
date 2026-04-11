/**
 * Resolves "back to home" links so they reach the main site from marketing subdomains
 * (e.g. support.lightra.in) where a relative "/" would stay on the subdomain.
 */
export function resolveMarketingBackHref(backTo: string): string {
  if (backTo !== "/") return backTo;
  const fromEnv = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") : undefined;
  if (fromEnv) return `${fromEnv}/`;

  if (typeof window === "undefined") return "/";
  const host = window.location.hostname;
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".vercel.app")) return "/";
  if (host === "lightra.in" || host === "www.lightra.in") return "/";
  if (host.endsWith(".lightra.in")) return "https://lightra.in/";
  return "/";
}
