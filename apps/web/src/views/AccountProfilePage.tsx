"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Store, Wallet } from "lucide-react";
import { staggerItem, staggerParent } from "../motion/stagger";
import { useAuthStore } from "../store/useAuthStore";
import { formatUsdFromCents, useWalletStore } from "../store/useWalletStore";

export function AccountProfilePage() {
  const user = useAuthStore((s) => s.user);
  const cashBalanceCents = useWalletStore((s) => s.cashBalanceCents);
  const reduceMotion = useReducedMotion();
  const item = staggerItem(!!reduceMotion);

  return (
    <motion.main variants={staggerParent} initial="hidden" animate="show">
      <motion.header variants={item} className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl sm:font-medium">Profile & settings</h1>
        <p className="mt-1 text-sm text-neutral-500">Your account details (demo).</p>
        <p className="mt-2 text-sm font-medium tabular-nums tracking-tight text-neutral-600">
          <span className="font-normal text-neutral-500">Cash </span>
          <span className="text-neutral-500">$</span>
          {formatUsdFromCents(cashBalanceCents)}
        </p>
      </motion.header>

      <motion.div variants={item} className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href="/marketplace"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
        >
          <Store className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Marketplace
        </Link>
        <Link
          href="/wallet/manage"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
        >
          <Wallet className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Wallet
        </Link>
      </motion.div>

      <motion.section variants={item} className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card sm:rounded-[24px]">
        <div className="border-b border-neutral-100 px-5 py-4 sm:px-8 sm:py-5">
          <p className="text-xs font-medium text-neutral-500">Name</p>
          <p className="mt-1 text-base font-medium text-neutral-900">{user?.name ?? "—"}</p>
        </div>
        <div className="px-5 py-4 sm:px-8 sm:py-5">
          <p className="text-xs font-medium text-neutral-500">Email</p>
          <p className="mt-1 text-base text-neutral-900">{user?.email ?? "—"}</p>
        </div>
      </motion.section>

      <motion.p variants={item} className="mt-6 text-center text-xs text-neutral-500">
        Contact support to change legal name or email on a live account.
      </motion.p>
    </motion.main>
  );
}
