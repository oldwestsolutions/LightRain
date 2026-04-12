import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { emptyShippingAddress, type ShippingAddress, type ShippingMethodId } from "@/lib/shopShipping";

export type CartLine = {
  key: string;
  productId: string;
  colorId: string;
  size: string;
  quantity: number;
};

function lineKey(productId: string, colorId: string, size: string) {
  return `${productId}::${colorId}::${size}`;
}

type ShopState = {
  lines: CartLine[];
  drawerOpen: boolean;
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethodId;
  setShippingAddress: (patch: Partial<ShippingAddress>) => void;
  setShippingMethod: (m: ShippingMethodId) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addToCart: (args: { productId: string; colorId: string; size: string; quantity?: number }) => void;
  setLineQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
};

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      lines: [],
      drawerOpen: false,
      shippingAddress: emptyShippingAddress(),
      shippingMethod: "standard" as ShippingMethodId,

      setShippingAddress: (patch) =>
        set((s) => ({ shippingAddress: { ...s.shippingAddress, ...patch } })),

      setShippingMethod: (m) => set({ shippingMethod: m }),

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),

      addToCart: ({ productId, colorId, size, quantity = 1 }) => {
        const key = lineKey(productId, colorId, size);
        const lines = get().lines;
        const i = lines.findIndex((l) => l.key === key);
        if (i >= 0) {
          const next = [...lines];
          const q = next[i]!.quantity + quantity;
          next[i] = { ...next[i]!, quantity: Math.min(99, q) };
          set({ lines: next, drawerOpen: true });
          return;
        }
        set({ lines: [...lines, { key, productId, colorId, size, quantity }], drawerOpen: true });
      },

      setLineQty: (key, qty) => {
        const q = Math.max(0, Math.min(99, Math.round(qty)));
        if (q === 0) {
          set({ lines: get().lines.filter((l) => l.key !== key) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.key === key ? { ...l, quantity: q } : l)),
        });
      },

      removeLine: (key) => set({ lines: get().lines.filter((l) => l.key !== key) }),

      clearCart: () => set({ lines: [] }),
    }),
    {
      name: "lr-shop-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        lines: s.lines,
        shippingAddress: s.shippingAddress,
        shippingMethod: s.shippingMethod,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<Pick<ShopState, "lines" | "shippingAddress" | "shippingMethod">> | undefined;
        return {
          ...current,
          lines: Array.isArray(p?.lines) ? p.lines : current.lines,
          shippingAddress:
            p?.shippingAddress && typeof p.shippingAddress === "object"
              ? { ...emptyShippingAddress(), ...p.shippingAddress }
              : current.shippingAddress,
          shippingMethod:
            p?.shippingMethod === "standard" || p?.shippingMethod === "expedited"
              ? p.shippingMethod
              : current.shippingMethod,
        };
      },
    }
  )
);

export function cartLineCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.quantity, 0);
}
