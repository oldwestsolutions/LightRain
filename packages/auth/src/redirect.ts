import { buildWalletLoginRedirect } from "./codec";
import { persistSession } from "./storage";
import type { AuthSession } from "./types";

export function redirectToWalletAfterLogin(
  session: AuthSession,
  opts: { walletOrigin: string; preferHandoff: boolean },
): void {
  persistSession(session);
  const url = opts.preferHandoff
    ? buildWalletLoginRedirect(opts.walletOrigin, session)
    : `${opts.walletOrigin.replace(/\/$/, "")}/`;
  if (typeof window !== "undefined") window.location.replace(url);
}
