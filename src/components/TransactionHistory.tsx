import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const slice = transactions.slice(start, start + pageSize);

  return (
    <section className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card sm:rounded-3xl">
      <h2 className="sr-only">Transaction history</h2>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 border-b border-neutral-100 px-4 py-4 text-left transition-colors hover:bg-neutral-50/80 sm:px-6 sm:py-5"
        aria-expanded={open}
        aria-controls="transaction-history-panel"
      >
        <div className="min-w-0 flex-1">
          <span className="block text-base font-semibold tracking-tight text-neutral-900 sm:text-lg">
            Transaction history
          </span>
          <span className="mt-1 block text-xs text-muted sm:text-sm">
            Recent settlements and transfers on your federation address
          </span>
        </div>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div id="transaction-history-panel">
        {transactions.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-muted sm:px-6">No transactions match your search.</p>
        ) : (
          <>
            <ul className="divide-y divide-neutral-100">
            {slice.map((tx) => (
              <li
                key={tx.id}
                className="flex flex-col gap-2 px-4 py-3.5 transition-colors hover:bg-neutral-50/80 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide sm:text-xs ${
                        tx.direction === "in"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {tx.direction === "in" ? "Received" : "Sent"}
                    </span>
                    <span
                      className={`text-sm font-semibold tabular-nums sm:text-base ${
                        tx.direction === "in" ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {tx.direction === "in" ? "+" : "−"}
                      {tx.amount} {tx.asset}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:text-xs ${
                        tx.status === "settled"
                          ? "bg-neutral-200 text-neutral-800"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {tx.status === "settled" ? "Settled" : "Pending"}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm font-medium text-neutral-900">{tx.counterparty}</p>
                  <p className="truncate font-mono text-[11px] text-accent sm:text-xs">{tx.federation}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted">{tx.memo}</p>
                </div>
                <time
                  className="shrink-0 text-[11px] text-muted sm:text-right sm:text-xs"
                  dateTime={tx.date}
                >
                  {formatWhen(tx.date)}
                </time>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-stretch gap-3 border-t border-neutral-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-center text-[11px] text-muted sm:text-left sm:text-xs">
              Page {safePage} of {totalPages} · {transactions.length} total
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => onPageChange(safePage - 1)}
                className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-800 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => onPageChange(safePage + 1)}
                className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-800 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          </>
        )}
        </div>
      )}
    </section>
  );
}
