import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ROOT = "lightra.in";

/** Map hostname prefix → internal path (content lives in app routes). */
const SUBDOMAIN_HOME: Record<string, string> = {
  support: "/support",
  company: "/company",
  shop: "/shop",
};

function subdomain(hostname: string): string | null {
  const h = hostname.split(":")[0]?.toLowerCase() ?? "";
  if (h === ROOT || h === `www.${ROOT}`) return null;
  if (!h.endsWith(`.${ROOT}`)) return null;
  const sub = h.slice(0, -(ROOT.length + 1));
  return sub || null;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const hostname = host.split(":")[0] ?? "";
  const sub = subdomain(hostname);
  if (!sub) return NextResponse.next();

  const target = SUBDOMAIN_HOME[sub];
  if (!target) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname !== "/" && pathname !== "") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = target;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/"],
};
