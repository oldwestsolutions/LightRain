import { create } from "zustand";
import type { AuthSession, AuthUser, UserRole } from "@lightrain/auth";
import {
  clearSession,
  createSessionFromCredentials,
  deriveInitialsFromName,
  patchSessionUser,
  persistSession,
  readSession,
} from "@lightrain/auth";

export type User = AuthUser;

export { deriveInitialsFromName };

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  role: UserRole | null;
  login: (email: string, _password: string) => Promise<AuthSession>;
  logout: () => void;
  updateProfile: (patch: Partial<Pick<User, "name" | "email" | "handle">>) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  role: null,
  login: async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const session = createSessionFromCredentials(email, password);
    persistSession(session);
    set({
      isLoggedIn: true,
      user: session.user,
      role: session.role,
    });
    return session;
  },
  logout: () => {
    clearSession();
    set({ isLoggedIn: false, user: null, role: null });
  },
  updateProfile: (patch) => {
    const session = readSession();
    if (!session) {
      set((state) => {
        if (!state.user) return state;
        const u = state.user;
        const name = patch.name ?? u.name;
        const email = patch.email ?? u.email;
        const rawHandle = patch.handle ?? u.handle;
        const handle = rawHandle.replace(/^@/, "").trim() || u.handle;
        const initials = patch.name !== undefined ? deriveInitialsFromName(name) : u.initials;
        return {
          user: { ...u, name, email, handle, initials },
        };
      });
      return;
    }
    const next = patchSessionUser(session, patch);
    persistSession(next);
    set({
      user: next.user,
      role: next.role,
    });
  },
}));

export function syncAuthFromStoredSession(): void {
  const session = readSession();
  if (!session) return;
  useAuthStore.setState({
    isLoggedIn: true,
    user: session.user,
    role: session.role,
  });
}
