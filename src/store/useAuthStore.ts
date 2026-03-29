import { create } from "zustand";

export type User = {
  email: string;
  name: string;
  initials: string;
  /** Public handle without @ (e.g. dispensary01 → shown as @dispensary01) */
  handle: string;
};

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, _password: string) => Promise<void>;
  logout: () => void;
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
}));
