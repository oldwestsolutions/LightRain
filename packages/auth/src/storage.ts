import { getAuthConfig } from "./config";
import type { AuthSession } from "./types";

const MAX_AGE_SEC = 60 * 60 * 24 * 14;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const parts = `; ${document.cookie}`.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

function writeCookie(name: string, value: string, domain?: string): void {
  if (typeof document === "undefined") return;
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";
  const domainPart = domain ? `; Domain=${domain}` : "";
  const securePart = secure ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${MAX_AGE_SEC}; SameSite=Lax${securePart}${domainPart}`;
}

function deleteCookie(name: string, domain?: string): void {
  if (typeof document === "undefined") return;
  const domainPart = domain ? `; Domain=${domain}` : "";
  document.cookie = `${name}=; Path=/; Max-Age=0${domainPart}`;
}

export function persistSession(session: AuthSession): void {
  const { storageKey, cookieName, cookieDomain } = getAuthConfig();
  const json = JSON.stringify(session);
  try {
    localStorage.setItem(storageKey, json);
  } catch {
    /* ignore quota */
  }
  writeCookie(cookieName, json, cookieDomain || undefined);
}

export function readSession(): AuthSession | null {
  const { storageKey, cookieName } = getAuthConfig();
  try {
    const fromLs = localStorage.getItem(storageKey);
    if (fromLs) {
      const s = JSON.parse(fromLs) as AuthSession;
      if (s?.version === 1 && s.user?.email) return s;
    }
  } catch {
    /* ignore */
  }
  const c = readCookie(cookieName);
  if (!c) return null;
  try {
    const s = JSON.parse(decodeURIComponent(c)) as AuthSession;
    if (s?.version === 1 && s.user?.email) return s;
  } catch {
    return null;
  }
  return null;
}

export function clearSession(): void {
  const { storageKey, cookieName, cookieDomain } = getAuthConfig();
  try {
    localStorage.removeItem(storageKey);
  } catch {
    /* ignore */
  }
  deleteCookie(cookieName, cookieDomain || undefined);
}
