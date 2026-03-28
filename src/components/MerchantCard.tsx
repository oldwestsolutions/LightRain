import { ArrowUpRight } from "lucide-react";
import type { Merchant } from "../data/merchants";

type Props = {
  merchant: Merchant;
  onView: (m: Merchant) => void;
};

export function MerchantCard({ merchant, onView }: Props) {
  return (
    <article className="group flex flex-col rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-700">
          {merchant.name}
        </h3>
        <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted">
          {merchant.type}
        </span>
      </div>
      <p className="mb-1 font-mono text-xs text-accent">{merchant.federationAddress}</p>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{merchant.description}</p>
      <button
        type="button"
        onClick={() => onView(merchant)}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50"
      >
        View profile
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </article>
  );
}
