import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { MERCHANTS } from "../data/merchants";
import { TRANSACTIONS } from "../data/transactions";
import { useAuthStore } from "../store/useAuthStore";
import { ProfileOverviewModal } from "./ProfileOverviewModal";
import { SendPaymentModal } from "./SendPaymentModal";
import { TransactionHistoryModal, TransactionHistoryTrigger } from "./TransactionHistory";
import { WalletModal } from "./WalletModal";

const FEDERATION_ADDRESS = "dispensary01*lightrain.in";
const TX_PAGE_SIZE = 5;

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

  const walletTitle = user?.name?.trim() || "Profile";

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
            <span className="text-xs font-medium text-neutral-500 sm:text-[13px]">Wallet</span>
            <span className="mt-1 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl sm:font-medium">
              <span className="text-neutral-400">+</span>
              {walletTitle}
            </span>
          </motion.button>
        </div>

        <TransactionHistoryTrigger embedded onOpen={() => setTxHistoryOpen(true)} />
      </section>

      {user && (
        <ProfileOverviewModal
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
          user={user}
          federationAddress={FEDERATION_ADDRESS}
          onMarketplace={() => navigate("/marketplace")}
          onWallet={() => setWalletOpen(true)}
        />
      )}
      <WalletModal
        open={walletOpen}
        onClose={() => setWalletOpen(false)}
        federationAddress={FEDERATION_ADDRESS}
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
