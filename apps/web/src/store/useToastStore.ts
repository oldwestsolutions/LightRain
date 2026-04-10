import { create } from "zustand";

type ToastState = {
  message: string | null;
  show: (message: string) => void;
  hide: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  show: (message: string) => {
    set({ message });
    window.setTimeout(() => set({ message: null }), 2800);
  },
  hide: () => set({ message: null }),
}));
