import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Send } from "lucide-react";
import { MERCHANTS } from "../data/merchants";
import { TRANSACTIONS } from "../data/transactions";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";
import { Navbar } from "./Navbar";
import { SendPaymentModal } from "./SendPaymentModal";
import { TransactionHistory } from "./TransactionHistory";

const WALLET = "dispensary01*lightrain.in";
const TX_PAGE_SIZE = 5;

export function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user)!;
  const logout = useAuthStore((s) => s.logout);
  const showToast = useToastStore((s) => s.show);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [txPage, setTxPage] = useState(1);
  const [sendOpen, setSendOpen] = useState(false);

  const firstName = user.name.split(" ")[0] ?? user.name;

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

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-[#0B0E14] text-neutral-100">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(139,92,246,0.12),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-grid-faint bg-[length:28px_28px] opacity-[0.12] sm:bg-[length:36px_36px]"
        aria-hidden
      />

      <Navbar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogout={handleLogout}
      />

      <main className="relative z-[2] mx-auto max-w-6xl px-3 pb-28 pt-[calc(5.25rem+env(safe-area-inset-top))] safe-pb sm:px-4 sm:pb-24 sm:pt-[calc(6.5rem+env(safe-area-inset-top))] lg:px-8 lg:pt-[calc(7rem+env(safe-area-inset-top))]">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">
              Account overview
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-[1.85rem] md:leading-snug">
              Welcome back, {firstName}
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
              Your settlement address is ready. Send and receive crypto with the clarity of a modern bank—built
              for regulated commerce.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSendOpen(true)}
            className="inline-flex min-h-[48px] w-full shrink-0 touch-manipulation items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 text-base font-semibold text-white shadow-[0_8px_32px_rgba(139,92,246,0.35)] transition-all hover:brightness-110 active:scale-[0.99] sm:w-auto sm:min-w-[160px] sm:self-start sm:text-sm"
          >
            <Send className="h-4 w-4 shrink-0" />
            Send payment
          </button>
        </div>

        <section className="relative mb-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#1a1d2e] via-[#14161f] to-[#0e1018] p-5 shadow-[0_12px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] sm:mb-10 sm:rounded-3xl sm:p-7 md:p-9">
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-600/20 blur-3xl" aria-hidden />
          <div className="relative mb-6 flex flex-col gap-3 border-b border-white/[0.06] pb-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500 sm:text-xs">
                Federation address
              </p>
              <p className="mt-1 text-xs text-neutral-400 sm:text-sm">Instant settlement · Stellar network</p>
            </div>
            <span className="inline-flex w-fit items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/30">
              Active
            </span>
          </div>
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="min-w-0 flex-1">
              <p className="break-words font-mono text-lg font-medium leading-snug tracking-tight text-white sm:break-all sm:text-xl md:text-2xl">
                {WALLET}
              </p>
              <p className="mt-3 text-xs text-neutral-500 sm:mt-4 sm:text-sm">Funds settle instantly to this address</p>
            </div>
            <button
              type="button"
              onClick={copyWallet}
              className="inline-flex min-h-[48px] w-full shrink-0 touch-manipulation items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.07] px-6 text-base font-semibold text-neutral-100 transition-all hover:bg-white/12 active:bg-white/[0.1] sm:w-auto sm:text-sm"
            >
              <Copy className="h-4 w-4 shrink-0" />
              Copy address
            </button>
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
