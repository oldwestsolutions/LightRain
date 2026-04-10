import type { Variants } from "framer-motion";

/** Page enter: stagger children (matches dashboard). */
export const staggerParent: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

export const staggerItem = (reduceMotion: boolean): Variants => ({
  hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
});

/** Nested lists: stagger row motion without fading the container. */
export const listStaggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};
