import { deriveInitialsFromName, roleFromEmail } from "./derive";
import type { AuthSession, AuthUser } from "./types";

function demoUserFromEmail(email: string): AuthUser {
  const e = email.trim() || "guest@lightra.in";
  const name =
    roleFromEmail(e) === "admin" ? "LightRain Operations" : "Mountain View Collective";
  return {
    email: e,
    name,
    initials: deriveInitialsFromName(name),
    handle: roleFromEmail(e) === "admin" ? "ops" : "dispensary01",
  };
}

export function createSessionFromCredentials(email: string, _password: string): AuthSession {
  const user = demoUserFromEmail(email);
  const role = roleFromEmail(user.email);
  const issuedAt = Date.now();
  const sub = btoa(unescape(encodeURIComponent(user.email))).replace(/=/g, "");
  return {
    version: 1,
    user,
    role,
    accessToken: `lr_at_${sub}_${issuedAt}`,
    refreshToken: `lr_rt_${sub}_${issuedAt}`,
    issuedAt,
  };
}

export function patchSessionUser(
  session: AuthSession,
  patch: Partial<Pick<AuthUser, "name" | "email" | "handle">>,
): AuthSession {
  const u = session.user;
  const name = patch.name ?? u.name;
  const email = patch.email ?? u.email;
  const rawHandle = patch.handle ?? u.handle;
  const handle = rawHandle.replace(/^@/, "").trim() || u.handle;
  const initials = patch.name !== undefined ? deriveInitialsFromName(name) : u.initials;
  const nextUser: AuthUser = { ...u, name, email, handle, initials };
  const role = roleFromEmail(email);
  return { ...session, user: nextUser, role };
}
