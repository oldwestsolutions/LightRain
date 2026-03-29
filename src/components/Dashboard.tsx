import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownLeft, Copy, Search, Send } from "lucide-react";
import { MERCHANTS } from "../data/merchants";
import { TRANSACTIONS } from "../data/transactions";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";
import { Navbar } from "./Navbar";
import { SendPaymentModal } from "./SendPaymentModal";
import { TransactionHistory } from "./TransactionHistory";

const WALLET = "dispensary01*lightrain.in";
const TX_PAGE_SIZE = 5;
const AVAILABLE_BALANCE = "2,847.32";

const staggerParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const staggerItem = (reduce: boolean) => ({
  hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export function Dashboard() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const showToast = useToastStore((s) => s.show);
  const reduceMotion = useReducedMotion();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [txPage, setTxPage] = useState(1);
  const [sendOpen, setSendOpen] = useState(false);

  const item = staggerItem(!!reduceMotion);

  const filteredTransactions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return TRANSACTIONS;
    return TRANSACTIONS.filter(
      (tx) =>
        tx.counterparty.toLowerCase().includes(q) ||
        tx.federation.toLowerCase().includes(q) ||
        tx.memo.toLowerCase().includes(q) ||
        tx.amount.toLowerCase().includes(q) ||
        tx.asset.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    setTxPage(1);
  }, [searchQuery]);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredTransactions.length / TX_PAGE_SIZE));
    setTxPage((p) => Math.min(p, maxPage));
  }, [filteredTransactions.length]);

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(WALLET);
      showToast("Address copied!");
    } catch {
      showToast("Copied");
    }
  };

  const handleReceive = async () => {
    try {
      await navigator.clipboard.writeText(WALLET);
      showToast("Copied — share your federation address to receive.");
    } catch {
      showToast("Could not copy");
    }
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-[#ECECEF] text-neutral-900">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-grid-faint bg-[length:32px_32px] opacity-25 sm:bg-[length:40px_40px] sm:opacity-30"
        aria-hidden
      />

      <Navbar onLogout={handleLogout} />

      <motion.main
        className="relative z-[2] mx-auto max-w-6xl px-3 pb-28 pt-[calc(4.75rem+env(safe-area-inset-top))] safe-pb sm:px-4 sm:pb-24 sm:pt-[calc(6rem+env(safe-area-inset-top))] lg:px-8 lg:pt-[calc(6.5rem+env(safe-area-inset-top))]"
        variants={staggerParent}
        initial="hidden"
        animate="show"
      >
        <motion.section
          variants={item}
          className="mb-8 overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card sm:mb-10 sm:rounded-[24px]"
        >
          <div className="border-b border-neutral-100 px-5 py-6 sm:px-8 sm:py-8">
            <p className="text-center text-xs font-medium uppercase tracking-[0.14em] text-muted">Available balance</p>
            <p className="mt-2 text-center font-mono text-4xl font-semibold tabular-nums tracking-tight text-neutral-900 sm:text-5xl">
              <span className="text-[0.55em] align-top text-neutral-600">$</span>
              {AVAILABLE_BALANCE}
            </p>
            <p className="mt-2 text-center text-xs text-muted">USDC · Demo</p>

            <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-3 sm:gap-4">
              <motion.button
                type="button"
                onClick={() => setSendOpen(true)}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="inline-flex min-h-[48px] min-w-[140px] flex-1 touch-manipulation items-center justify-center gap-2.5 rounded-full border border-neutral-200 bg-neutral-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 sm:flex-initial sm:px-10"
                aria-label="Send"
              >
                <Send className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                Send
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

          <div className="border-b border-neutral-100 px-5 py-4 sm:px-8 sm:py-5">
            <label htmlFor="dashboard-tx-search" className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted sm:left-4" />
              <input
                id="dashboard-tx-search"
                type="search"
                placeholder="Search transactions…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-h-[48px] w-full rounded-full border border-neutral-200 bg-neutral-50/80 py-3 pl-10 pr-4 text-base text-neutral-900 placeholder:text-muted/80 outline-none transition-all duration-300 focus:border-neutral-300 focus:bg-white focus:shadow-sm sm:py-3.5 sm:pl-11 sm:pr-5 sm:text-sm"
              />
            </label>
          </div>

          <div className="px-5 py-5 sm:px-8 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Federation address</p>
                <p className="mt-1 font-mono text-base font-medium text-neutral-900 sm:text-lg">{WALLET}</p>
                <p className="mt-2 text-xs text-muted">Stellar · Active</p>
              </div>
              <motion.button
                type="button"
                onClick={copyWallet}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="inline-flex min-h-[44px] shrink-0 touch-manipulation items-center justify-center gap-2 self-center rounded-full border border-neutral-200 bg-white px-7 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 sm:self-auto"
              >
                <Copy className="h-4 w-4 shrink-0" aria-hidden />
                Copy
              </motion.button>
            </div>
          </div>
        </motion.section>

        <motion.div variants={item}>
          <TransactionHistory
            transactions={filteredTransactions}
            page={txPage}
            pageSize={TX_PAGE_SIZE}
            onPageChange={setTxPage}
          />
        </motion.div>
      </motion.main>

      <SendPaymentModal open={sendOpen} onClose={() => setSendOpen(false)} merchants={MERCHANTS} />
    </div>
  );
}
