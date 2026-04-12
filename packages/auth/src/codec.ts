import type { AuthSession } from "./types";

function utf8ToBase64(json: string): string {
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin);
}

function base64ToUtf8(b64: string): string {
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeSessionHandoff(session: AuthSession): string {
  return utf8ToBase64(JSON.stringify(session));
}

export function decodeSessionHandoff(b64: string): AuthSession | null {
  try {
    const raw = base64ToUtf8(b64);
    const parsed = JSON.parse(raw) as AuthSession;
    if (parsed?.version !== 1 || !parsed.user?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

