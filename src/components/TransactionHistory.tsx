import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LedgerTransaction } from "../data/transactions";
import { Modal } from "./Modal";

type ListProps = {
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

export function TransactionHistoryList({ transactions, page, pageSize, onPageChange }: ListProps) {
  const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const slice = transactions.slice(start, start + pageSize);

  if (transactions.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No transactions yet.</p>;
  }

  return (
    <>
      <ul className="divide-y divide-neutral-100 rounded-xl border border-neutral-200/90 overflow-hidden">
        {slice.map((tx) => (
          <li
            key={tx.id}
            className="flex flex-col gap-2 bg-white px-4 py-3.5 transition-colors hover:bg-neutral-50/80 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide sm:text-xs ${
                    tx.direction === "in" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
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
                    tx.status === "settled" ? "bg-neutral-200 text-neutral-800" : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {tx.status === "settled" ? "Settled" : "Pending"}
                </span>
              </div>
              <p className="mt-1 truncate text-sm font-medium text-neutral-900">{tx.counterparty}</p>
              <p className="truncate font-mono text-[11px] text-accent sm:text-xs">{tx.federation}</p>
              <p className="mt-0.5 line-clamp-2 text-xs text-muted">{tx.memo}</p>
            </div>
            <time className="shrink-0 text-[11px] text-muted sm:text-right sm:text-xs" dateTime={tx.date}>
              {formatWhen(tx.date)}
            </time>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
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
  );
}

type TriggerProps = {
  onOpen: () => void;
  embedded?: boolean;
};

/** Summary row on the dashboard; opens the full history modal. */
export function TransactionHistoryTrigger({ onOpen, embedded }: TriggerProps) {
  return (
    <section
      className={
        embedded
          ? "overflow-hidden border-t border-neutral-100"
          : "overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card sm:rounded-3xl"
      }
    >
      <h2 className="sr-only">Transaction history</h2>
      <button
        type="button"
        onClick={onOpen}
        className={`flex w-full px-4 py-4 transition-colors sm:px-6 sm:py-5 ${
          embedded
            ? "flex-col items-center justify-center text-center hover:bg-neutral-50/80"
            : "items-start text-left hover:bg-neutral-50/80"
        }`}
        aria-haspopup="dialog"
      >
        <div className={embedded ? "min-w-0 max-w-md" : "min-w-0 flex-1"}>
          <span className="block text-base font-semibold tracking-tight text-neutral-900 sm:text-lg">
            Transaction history
          </span>
          <span className="mt-1 block text-xs text-muted sm:text-sm">
            Recent settlements and transfers on your federation address
          </span>
        </div>
      </button>
    </section>
  );
}

type ModalProps = {
  open: boolean;
  onClose: () => void;
  transactions: LedgerTransaction[];
  pageSize?: number;
};

export function TransactionHistoryModal({ open, onClose, transactions, pageSize = 5 }: ModalProps) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (open) setPage(1);
  }, [open]);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(transactions.length / pageSize));
    setPage((p) => Math.min(p, maxPage));
  }, [transactions.length, pageSize]);

  return (
    <Modal open={open} title="Transaction history" onClose={onClose} wide>
      <p className="mb-4 text-sm text-muted">
        Recent settlements and transfers on your federation address
      </p>
      <TransactionHistoryList transactions={transactions} page={page} pageSize={pageSize} onPageChange={setPage} />
    </Modal>
  );
}
