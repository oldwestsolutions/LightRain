import type { AuthConfig } from "./types";

const defaults = {
  cookieDomain: "" as string | undefined,
  cookieName: "lr_session_v1",
  storageKey: "lightrain.auth.v1",
};

let active: typeof defaults = { ...defaults };

export function configureAuth(patch: AuthConfig): void {
  active = {
    cookieDomain: patch.cookieDomain ?? active.cookieDomain,
    cookieName: patch.cookieName ?? active.cookieName,
    storageKey: patch.storageKey ?? active.storageKey,
  };
}

export function getAuthConfig(): Readonly<typeof active> {
  return active;
}
