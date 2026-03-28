import { CheckCircle2 } from "lucide-react";
import { useToastStore } from "../store/useToastStore";

export function Toast() {
  const message = useToastStore((s) => s.message);

  if (!message) return null;

  return (
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-[200] flex -translate-x-1/2 justify-center px-4">
      <div
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm text-neutral-900 shadow-card backdrop-blur-md transition-all duration-500"
        role="status"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden />
        <span>{message}</span>
      </div>
    </div>
  );
}
