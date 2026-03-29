import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Wraps route content so navigations get a short fade + slide; respects reduced motion.
 */
export function PageTransitionLayout() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const transition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

  const initial = reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 };
  const animate = { opacity: 1, y: 0 };
  const exit = reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="min-h-[100dvh] w-full"
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
