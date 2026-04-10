export type UserRole = "user" | "admin";

export type AuthUser = {
  email: string;
  name: string;
  initials: string;
  /** Public handle without @ */
  handle: string;
};

export type AuthSession = {
  version: 1;
  user: AuthUser;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
  issuedAt: number;
};

export type AuthConfig = {
  /** e.g. `.lightra.in` — enables shared cookies across wallet/admin/web */
  cookieDomain?: string;
  cookieName?: string;
  storageKey?: string;
};
