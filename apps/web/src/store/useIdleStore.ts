import { create } from "zustand";

const IDLE_MS = 3 * 60 * 1000;
const SCREENSAVER_RELOGIN_MS = 2 * 60 * 1000;

type IdleState = {
  /** Monotonic clock at last user activity (main app, not screensaver) */
  lastActivityAt: number;
  touchActivity: () => void;
  secondsSinceActivity: () => number;
  isIdleExceeded: () => boolean;
  /** Screensaver-only: prompt after extra idle */
  screensaverIdleStartedAt: number | null;
  startScreensaverIdle: () => void;
  clearScreensaverIdle: () => void;
  isScreensaverReloginDue: () => boolean;
  IDLE_MS: number;
  SCREENSAVER_RELOGIN_MS: number;
};

export const useIdleStore = create<IdleState>((set, get) => ({
  lastActivityAt: Date.now(),
  IDLE_MS,
  SCREENSAVER_RELOGIN_MS,

  touchActivity: () => set({ lastActivityAt: Date.now() }),

  secondsSinceActivity: () => (Date.now() - get().lastActivityAt) / 1000,

  isIdleExceeded: () => Date.now() - get().lastActivityAt >= IDLE_MS,

  screensaverIdleStartedAt: null,

  startScreensaverIdle: () => set({ screensaverIdleStartedAt: Date.now() }),

  clearScreensaverIdle: () => set({ screensaverIdleStartedAt: null }),

  isScreensaverReloginDue: () => {
    const t = get().screensaverIdleStartedAt;
    if (t == null) return false;
    return Date.now() - t >= SCREENSAVER_RELOGIN_MS;
  },
}));
