import { ArrowUpRight } from "lucide-react";
import type { Merchant } from "../data/merchants";

type Props = {
  merchant: Merchant;
  onView: (m: Merchant) => void;
};

export function MerchantCard({ merchant, onView }: Props) {
  return (
    <article className="group flex flex-col rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-md sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4">
        <h3 className="min-w-0 text-[15px] font-semibold leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-700 sm:text-base">
          {merchant.name}
        </h3>
        <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted">
          {merchant.type}
        </span>
      </div>
      <p className="mb-1 break-all font-mono text-[11px] text-accent sm:text-xs">{merchant.federationAddress}</p>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted sm:mb-6">{merchant.description}</p>
      <button
        type="button"
        onClick={() => onView(merchant)}
        className="inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-base font-semibold text-neutral-800 transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100 sm:text-sm"
      >
        View profile
        <ArrowUpRight className="h-4 w-4 shrink-0" />
      </button>
    </article>
  );
}
