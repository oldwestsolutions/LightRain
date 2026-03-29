import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
};

export function Modal({ open, title, onClose, children, wide }: ModalProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const panelMaxH =
    "max-h-[min(72dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-3.5rem))] sm:max-h-[min(78dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-4rem))]";

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.85 },
      };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain">
      <button
        type="button"
        className="fixed inset-0 z-0 min-h-full bg-neutral-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        className="relative z-10 flex min-h-[100dvh] w-full justify-center px-3 pb-14 pt-[max(1rem,calc(env(safe-area-inset-top)+1.25rem))] sm:px-5 sm:pb-20 sm:pt-[max(1.25rem,calc(env(safe-area-inset-top)+1.75rem))]"
        onClick={onClose}
        role="presentation"
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.stopPropagation()}
          className={`my-auto flex w-full flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-xl sm:rounded-2xl ${panelMaxH} ${
            wide ? "max-w-lg" : "max-w-md"
          }`}
          {...motionProps}
        >
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-neutral-100 bg-white px-4 py-3.5 sm:px-5 sm:py-4">
            <h2 id="modal-title" className="pr-2 text-[1.05rem] font-semibold leading-snug tracking-tight text-neutral-900 sm:text-lg">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[44px] min-w-[44px] shrink-0 touch-manipulation items-center justify-center rounded-full text-muted transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:pb-5 safe-pb">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
