import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownLeft, Copy, Store } from "lucide-react";
import { TRANSACTIONS } from "../data/transactions";
import { staggerItem, staggerParent } from "../motion/stagger";
import { useToastStore } from "../store/useToastStore";
import { TransactionHistory } from "./TransactionHistory";

const WALLET = "dispensary01*lightrain.in";
const TX_PAGE_SIZE = 5;
const AVAILABLE_BALANCE = "2,847.32";

export function Dashboard() {
  const navigate = useNavigate();
  const showToast = useToastStore((s) => s.show);
  const reduceMotion = useReducedMotion();

  const [txPage, setTxPage] = useState(1);
  const item = staggerItem(!!reduceMotion);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(TRANSACTIONS.length / TX_PAGE_SIZE));
    setTxPage((p) => Math.min(p, maxPage));
  }, []);

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(WALLET);
      showToast("Copied to clipboard");
    } catch {
      showToast("Copied");
    }
  };

  const handleReceive = async () => {
    try {
      await navigator.clipboard.writeText(WALLET);
      showToast("Copied — share this address to get paid.");
    } catch {
      showToast("Could not copy");
    }
  };

  return (
    <motion.main variants={staggerParent} initial="hidden" animate="show">
      <motion.section
        variants={item}
        className="mb-8 overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card sm:mb-10 sm:rounded-[24px]"
      >
        <div className="border-b border-neutral-100 px-5 py-6 sm:px-8 sm:py-8">
          <p className="text-center text-xs font-medium text-neutral-500 sm:text-[13px]">Available</p>
          <p className="mt-2 text-center text-4xl font-semibold tabular-nums tracking-tight text-neutral-900 sm:text-5xl sm:font-medium">
            <span className="text-[0.55em] align-top text-neutral-500">$</span>
            {AVAILABLE_BALANCE}
          </p>
          <p className="mt-2 text-center text-xs text-neutral-500">Cash available · Demo</p>

          <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-3 sm:gap-4">
            <motion.button
              type="button"
              onClick={() => navigate("/marketplace")}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="inline-flex min-h-[48px] min-w-[140px] flex-1 touch-manipulation items-center justify-center gap-2.5 rounded-full border border-neutral-200 bg-neutral-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 sm:flex-initial sm:px-10"
              aria-label="Marketplace"
            >
              <Store className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Marketplace
            </motion.button>
            <motion.button
              type="button"
              onClick={handleReceive}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="inline-flex min-h-[48px] min-w-[140px] flex-1 touch-manipulation items-center justify-center gap-2.5 rounded-full border border-neutral-200 bg-white px-8 py-3 text-sm font-semibold text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 sm:flex-initial sm:px-10"
              aria-label="Receive"
            >
              <ArrowDownLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Receive
            </motion.button>
          </div>
        </div>

        <div className="border-t border-neutral-100 px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex flex-col gap-4 rounded-xl border border-neutral-200/80 bg-neutral-50/90 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Receiving address
                </p>
                <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-600 ring-1 ring-neutral-200/90">
                  Primary
                </span>
              </div>
              <p
                className="mt-2 break-all font-mono text-[13px] font-medium leading-snug tracking-wide text-neutral-900 sm:text-sm"
                translate="no"
              >
                {WALLET}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                Use this address for deposits and payouts. Keep it private like an account number.
              </p>
            </div>
            <motion.button
              type="button"
              onClick={copyWallet}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="inline-flex min-h-[44px] shrink-0 touch-manipulation items-center justify-center gap-2 self-stretch rounded-xl border border-neutral-200/90 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 sm:self-center sm:px-6"
            >
              <Copy className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
              Copy address
            </motion.button>
          </div>
        </div>
      </motion.section>

      <motion.div variants={item}>
        <TransactionHistory
          transactions={TRANSACTIONS}
          page={txPage}
          pageSize={TX_PAGE_SIZE}
          onPageChange={setTxPage}
        />
      </motion.div>
    </motion.main>
  );
}
