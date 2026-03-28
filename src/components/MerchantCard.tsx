import { ArrowUpRight } from "lucide-react";
import type { Merchant } from "../data/merchants";

type Props = {
  merchant: Merchant;
  onView: (m: Merchant) => void;
};

export function MerchantCard({ merchant, onView }: Props) {
  return (
    <article className="group flex flex-col rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition-all duration-300 hover:border-white/25 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold tracking-tight text-white transition-colors group-hover:text-mint/95">
          {merchant.name}
        </h3>
        <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
          {merchant.type}
        </span>
      </div>
      <p className="mb-1 font-mono text-xs text-mint/90">{merchant.federationAddress}</p>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">{merchant.description}</p>
      <button
        type="button"
        onClick={() => onView(merchant)}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-mint/40 hover:bg-mint/10 hover:text-mint"
      >
        View Profile
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </article>
  );
}
