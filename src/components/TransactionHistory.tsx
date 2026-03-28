import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LedgerTransaction } from "../data/transactions";

type Props = {
  transactions: LedgerTransaction[];
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

function formatWhen(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function TransactionHistory({ transactions, page, pageSize, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const slice = transactions.slice(start, start + pageSize);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12141c]/90 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:rounded-3xl">
      <div className="border-b border-white/[0.06] px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">Transaction history</h2>
        <p className="mt-1 text-xs text-neutral-400 sm:text-sm">Recent settlements and transfers on your federation address</p>
      </div>

      {transactions.length === 0 ? (
        <p className="px-4 py-12 text-center text-sm text-neutral-500 sm:px-6">No transactions match your search.</p>
      ) : (
        <>
          <ul className="divide-y divide-white/[0.06]">
            {slice.map((tx) => (
              <li
                key={tx.id}
                className="flex flex-col gap-2 px-4 py-3.5 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide sm:text-xs ${
                        tx.direction === "in"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-rose-500/15 text-rose-300"
                      }`}
                    >
                      {tx.direction === "in" ? "Received" : "Sent"}
                    </span>
                    <span
                      className={`text-sm font-semibold tabular-nums sm:text-base ${
                        tx.direction === "in" ? "text-emerald-300" : "text-rose-300"
                      }`}
                    >
                      {tx.direction === "in" ? "+" : "−"}
                      {tx.amount} {tx.asset}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:text-xs ${
                        tx.status === "settled"
                          ? "bg-violet-500/20 text-violet-200"
                          : "bg-amber-500/15 text-amber-200"
                      }`}
                    >
                      {tx.status === "settled" ? "Settled" : "Pending"}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm font-medium text-neutral-100">{tx.counterparty}</p>
                  <p className="truncate font-mono text-[11px] text-violet-300/90 sm:text-xs">{tx.federation}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500">{tx.memo}</p>
                </div>
                <time
                  className="shrink-0 text-[11px] text-neutral-500 sm:text-right sm:text-xs"
                  dateTime={tx.date}
                >
                  {formatWhen(tx.date)}
                </time>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-stretch gap-3 border-t border-white/[0.06] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-center text-[11px] text-neutral-500 sm:text-left sm:text-xs">
              Page {safePage} of {totalPages} · {transactions.length} total
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => onPageChange(safePage - 1)}
                className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-200 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => onPageChange(safePage + 1)}
                className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-200 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
