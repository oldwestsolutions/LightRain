import { decodeSessionHandoff } from "./codec";
import { persistSession } from "./storage";
import type { AuthSession } from "./types";

/** Call once on wallet (or admin) app load to accept marketing-site login handoff. */
export function consumeWalletHandoffIfPresent(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("lr_handoff");
  if (!raw) return null;
  const session = decodeSessionHandoff(decodeURIComponent(raw));
  if (!session) return null;
  persistSession(session);
  const path = window.location.pathname || "/";
  window.history.replaceState({}, "", path);
  return session;
}
