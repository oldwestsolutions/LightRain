import { create } from "zustand";

export type User = {
  email: string;
  name: string;
  initials: string;
  /** Public handle without @ (e.g. dispensary01 → shown as @dispensary01) */
  handle: string;
};

export function deriveInitialsFromName(name: string): string {
  const t = name.trim();
  if (!t) return "?";
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase().slice(0, 2) || "?";
  }
  return t.slice(0, 2).toUpperCase();
}

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, _password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (patch: Partial<Pick<User, "name" | "email" | "handle">>) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    set({
      isLoggedIn: true,
      user: {
        email,
        name: "Mountain View Collective",
        initials: "MV",
        handle: "dispensary01",
      },
    });
  },
  logout: () => set({ isLoggedIn: false, user: null }),
  updateProfile: (patch) =>
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
    }),
}));
