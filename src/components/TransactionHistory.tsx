import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
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
    return (
      <p className="rounded-2xl bg-neutral-50 py-14 text-center text-sm text-neutral-500">
        No activity yet.
      </p>
    );
  }

  return (
    <>
      <ul className="divide-y divide-neutral-100/90 overflow-hidden rounded-2xl bg-neutral-50/50">
        {slice.map((tx) => (
          <li
            key={tx.id}
            className="flex gap-4 bg-white/80 px-4 py-4 transition-colors hover:bg-white sm:px-5 sm:py-4"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 truncate text-[15px] font-medium leading-snug text-neutral-900">
                  {tx.counterparty}
                </p>
                <span
                  className={`shrink-0 text-[15px] font-semibold tabular-nums tracking-tight ${
                    tx.direction === "in" ? "text-emerald-600" : "text-neutral-900"
                  }`}
                >
                  {tx.direction === "in" ? "+" : "−"}
                  {tx.amount} {tx.asset}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span
                  className={`text-[11px] font-medium uppercase tracking-wide ${
                    tx.direction === "in" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {tx.direction === "in" ? "In" : "Out"}
                </span>
                <span className="text-[11px] text-neutral-400">·</span>
                <span
                  className={`text-[11px] font-medium ${
                    tx.status === "settled" ? "text-neutral-500" : "text-amber-700"
                  }`}
                >
                  {tx.status === "settled" ? "Completed" : "Pending"}
                </span>
              </div>
              <p className="truncate font-mono text-[11px] text-neutral-400">{tx.federation}</p>
              {tx.memo ? <p className="line-clamp-2 text-[13px] leading-snug text-neutral-500">{tx.memo}</p> : null}
            </div>
            <time
              className="shrink-0 pt-0.5 text-right text-[11px] tabular-nums text-neutral-400 sm:text-xs"
              dateTime={tx.date}
            >
              {formatWhen(tx.date)}
            </time>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center text-[11px] text-neutral-400 sm:text-left sm:text-xs">
          {transactions.length} items · page {safePage} of {totalPages}
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
  /** Formatted dollars only (e.g. 0.00 or 1,234.56) */
  balanceDisplay: string;
};

/** Centered cash row; opens full activity modal. */
export function TransactionHistoryTrigger({ onOpen, embedded, balanceDisplay }: TriggerProps) {
  const reduceMotion = useReducedMotion();
  const spring: Transition = reduceMotion
    ? { duration: 0.01 }
    : { type: "spring", stiffness: 420, damping: 28, mass: 0.88 };

  return (
    <section
      className={
        embedded
          ? "overflow-hidden border-t border-neutral-100 bg-gradient-to-b from-white to-neutral-50/90"
          : "overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card sm:rounded-3xl"
      }
    >
      <h2 className="sr-only">Account activity</h2>
      <motion.button
        type="button"
        onClick={onOpen}
        whileHover={reduceMotion ? undefined : { scale: 1.005 }}
        whileTap={reduceMotion ? undefined : { scale: 0.992 }}
        transition={spring}
        className="relative flex w-full min-h-[100px] flex-col items-center justify-center px-5 py-5 text-center transition-colors hover:bg-white/80 sm:min-h-[108px] sm:px-7 sm:py-6"
        aria-haspopup="dialog"
        aria-label={`Open activity, ${balanceDisplay} dollars cash`}
      >
        <div className="mx-auto max-w-md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">Cash</p>
          <p className="mt-1 text-[2rem] font-medium leading-none tracking-tight tabular-nums text-neutral-900 sm:text-[2.125rem]">
            <span className="text-[1.35rem] font-medium text-neutral-400 sm:text-[1.45rem]">$</span>
            {balanceDisplay}
          </p>
        </div>
        <ChevronRight
          className="pointer-events-none absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-300 sm:right-7"
          strokeWidth={1.75}
          aria-hidden
        />
      </motion.button>
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
    <Modal open={open} title="Activity" onClose={onClose} wide>
      <TransactionHistoryList transactions={transactions} page={page} pageSize={pageSize} onPageChange={setPage} />
    </Modal>
  );
}
