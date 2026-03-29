import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
/** Demo available balance — Cash App–style headline number */
const AVAILABLE_BALANCE = "2,847.32";

export function Dashboard() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const showToast = useToastStore((s) => s.show);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [txPage, setTxPage] = useState(1);
  const [sendOpen, setSendOpen] = useState(false);

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

      <main className="relative z-[2] mx-auto max-w-6xl px-3 pb-28 pt-[calc(4.75rem+env(safe-area-inset-top))] safe-pb sm:px-4 sm:pb-24 sm:pt-[calc(6rem+env(safe-area-inset-top))] lg:px-8 lg:pt-[calc(6.5rem+env(safe-area-inset-top))]">
        <section className="mb-10 overflow-hidden rounded-[28px] border border-neutral-200/80 bg-white shadow-card sm:mb-14">
          {/* Cash App–inspired balance + Send / Receive */}
          <div className="bg-neutral-950 px-5 pb-10 pt-10 text-center sm:px-8 sm:pb-12 sm:pt-12">
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/55">Available balance</p>
            <p className="mt-2 font-mono text-5xl font-semibold tabular-nums tracking-tight text-white sm:text-6xl">
              <span className="text-[0.55em] align-top text-white/90">$</span>
              {AVAILABLE_BALANCE}
            </p>
            <p className="mt-2 text-xs text-white/45">USDC · Demo · Not a bank account</p>

            <div className="mx-auto mt-10 flex max-w-sm items-start justify-center gap-10 sm:gap-14">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setSendOpen(true)}
                  className="flex h-[72px] w-[72px] touch-manipulation items-center justify-center rounded-full bg-white text-neutral-950 shadow-lg transition-transform active:scale-[0.98]"
                  aria-label="Send"
                >
                  <Send className="h-7 w-7" strokeWidth={2} aria-hidden />
                </button>
                <span className="mt-3 text-sm font-semibold text-white/90">Send</span>
              </div>
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleReceive}
                  className="flex h-[72px] w-[72px] touch-manipulation items-center justify-center rounded-full border-2 border-white/25 bg-white/10 text-white backdrop-blur-sm transition-transform active:scale-[0.98]"
                  aria-label="Receive"
                >
                  <ArrowDownLeft className="h-7 w-7" strokeWidth={2} aria-hidden />
                </button>
                <span className="mt-3 text-sm font-semibold text-white/90">Receive</span>
              </div>
            </div>
          </div>

          <div className="border-b border-neutral-100 px-5 py-5 sm:px-8 sm:py-6">
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

          {/* Federation address — compact, scannable */}
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Federation address</p>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                    Active
                  </span>
                </div>
                <p className="mt-2 text-xs text-neutral-500 sm:text-sm">Instant settlement · Stellar network</p>
                <p className="mt-4 break-all font-mono text-lg font-semibold leading-snug tracking-tight text-neutral-900 sm:text-xl md:text-2xl">
                  {WALLET}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                  Funds settle instantly to this address. Use Receive to copy and share with payers.
                </p>
              </div>
              <button
                type="button"
                onClick={copyWallet}
                className="inline-flex min-h-[48px] w-full shrink-0 touch-manipulation items-center justify-center gap-2 self-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-800 shadow-sm transition-all hover:bg-neutral-50 sm:w-auto sm:self-start"
              >
                <Copy className="h-4 w-4 shrink-0" aria-hidden />
                Copy address
              </button>
            </div>
          </div>
        </section>

        <TransactionHistory
          transactions={filteredTransactions}
          page={txPage}
          pageSize={TX_PAGE_SIZE}
          onPageChange={setTxPage}
        />
      </main>

      <SendPaymentModal open={sendOpen} onClose={() => setSendOpen(false)} merchants={MERCHANTS} />
    </div>
  );
}
