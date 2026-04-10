"use client";

import { RedirectToWallet } from "./RedirectToWallet";

/** Legacy authenticated marketing routes forward signed-in users to the wallet app. */
export function AuthenticatedLayout() {
  return <RedirectToWallet />;
}
