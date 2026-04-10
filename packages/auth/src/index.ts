export type { AuthConfig, AuthSession, AuthUser, UserRole } from "./types";
export { configureAuth, getAuthConfig } from "./config";
export { deriveInitialsFromName, roleFromEmail } from "./derive";
export { encodeSessionHandoff, decodeSessionHandoff, buildWalletLoginRedirect } from "./codec";
export { persistSession, readSession, clearSession } from "./storage";
export { createSessionFromCredentials, patchSessionUser } from "./session";
export { consumeWalletHandoffIfPresent } from "./bootstrap";
export { redirectToWalletAfterLogin } from "./redirect";
