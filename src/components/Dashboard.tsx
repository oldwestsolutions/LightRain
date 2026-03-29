import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { Store, Wallet } from "lucide-react";
import { MERCHANTS } from "../data/merchants";
import { TRANSACTIONS } from "../data/transactions";
import { useAuthStore } from "../store/useAuthStore";
import { ProfileOverviewModal } from "./ProfileOverviewModal";
import { SendPaymentModal } from "./SendPaymentModal";
import { TransactionHistoryModal, TransactionHistoryTrigger } from "./TransactionHistory";
import { WalletModal } from "./WalletModal";

const FEDERATION_ADDRESS = "dispensary01*lightrain.in";
const TX_PAGE_SIZE = 5;
const AVAILABLE_BALANCE = "2,847.32";

export function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const reduceMotion = useReducedMotion();

  const [profileOpen, setProfileOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [txHistoryOpen, setTxHistoryOpen] = useState(false);
  const btnSpring: Transition = reduceMotion
    ? { duration: 0.01 }
    : { type: "spring", stiffness: 420, damping: 26, mass: 0.9 };

  const handleId = user?.handle?.replace(/^@/, "") ?? "account";

  return (
    <main className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col justify-center px-2 py-10 sm:max-w-lg sm:px-3 sm:py-16 md:max-w-xl md:py-20 lg:py-24">
      <section className="w-full overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card sm:rounded-[24px]">
        <div className="border-b border-neutral-100 px-5 py-6 sm:px-8 sm:py-8">
          <motion.button
            type="button"
            onClick={() => setProfileOpen(true)}
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={btnSpring}
            className="flex w-full max-w-md mx-auto flex-col items-center rounded-2xl px-4 py-3 text-center transition-colors hover:bg-neutral-50 sm:py-4"
            aria-haspopup="dialog"
            aria-expanded={profileOpen}
          >
            <span className="text-xs font-medium text-neutral-500 sm:text-[13px]">Account</span>
            <span className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl sm:font-medium">
              {handleId}
            </span>
          </motion.button>

          <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-3 sm:gap-4">
            <motion.button
              type="button"
              onClick={() => navigate("/marketplace")}
              whileHover={reduceMotion ? undefined : { scale: 1.03, y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              transition={btnSpring}
              className="inline-flex min-h-[48px] min-w-[140px] flex-1 touch-manipulation items-center justify-center gap-2.5 rounded-full border border-neutral-200 bg-neutral-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 sm:flex-initial sm:px-10"
              aria-label="Marketplace"
            >
              <Store className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Marketplace
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setWalletOpen(true)}
              whileHover={reduceMotion ? undefined : { scale: 1.03, y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              transition={btnSpring}
              className="inline-flex min-h-[48px] min-w-[140px] flex-1 touch-manipulation items-center justify-center gap-2.5 rounded-full border border-neutral-200 bg-white px-8 py-3 text-sm font-semibold text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 sm:flex-initial sm:px-10"
              aria-label="Wallet"
            >
              <Wallet className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Wallet
            </motion.button>
          </div>
        </div>

        <TransactionHistoryTrigger embedded onOpen={() => setTxHistoryOpen(true)} />
      </section>

      {user && (
        <ProfileOverviewModal
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
          user={user}
          federationAddress={FEDERATION_ADDRESS}
        />
      )}
      <WalletModal
        open={walletOpen}
        onClose={() => setWalletOpen(false)}
        federationAddress={FEDERATION_ADDRESS}
        availableBalanceDisplay={AVAILABLE_BALANCE}
        onOpenSend={() => setSendOpen(true)}
      />
      <SendPaymentModal open={sendOpen} onClose={() => setSendOpen(false)} merchants={MERCHANTS} />
      <TransactionHistoryModal
        open={txHistoryOpen}
        onClose={() => setTxHistoryOpen(false)}
        transactions={TRANSACTIONS}
        pageSize={TX_PAGE_SIZE}
      />
    </main>
  );
}
