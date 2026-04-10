import { configureAuth } from "@lightrain/auth";
import { syncAuthFromStoredSession } from "./store/useAuthStore";

export function initWebAuth(): void {
  configureAuth({
    cookieDomain: process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN || undefined,
  });
  syncAuthFromStoredSession();
}
