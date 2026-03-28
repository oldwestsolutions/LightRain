import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
};

export function Modal({ open, title, onClose, children, wide }: ModalProps) {
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        className={`relative z-10 flex max-h-[min(92dvh,100%)] w-full flex-col overflow-hidden rounded-t-2xl border border-neutral-200 bg-white shadow-card transition-all duration-300 sm:max-h-[min(90vh,800px)] sm:rounded-2xl ${
          wide ? "max-w-lg" : "max-w-md"
        }`}
      >
        <div className="flex max-h-[inherit] flex-col overflow-y-auto overscroll-contain p-4 safe-pb sm:p-6">
          <div className="mb-4 flex shrink-0 items-start justify-between gap-4">
            <h2 id="modal-title" className="pr-2 text-lg font-semibold tracking-tight text-neutral-900">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[44px] min-w-[44px] shrink-0 touch-manipulation items-center justify-center rounded-lg text-muted transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="min-h-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
