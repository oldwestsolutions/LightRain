import type { UserRole } from "./types";

export function deriveInitialsFromName(name: string): string {
  const t = name.trim();
  if (!t) return "?";
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase().slice(0, 2) || "?";
  }
  return t.slice(0, 2).toUpperCase();
}

export function roleFromEmail(email: string): UserRole {
  const e = email.trim().toLowerCase();
  if (e === "admin@lightra.in" || e.endsWith("@lightrain.internal")) return "admin";
  return "user";
}
