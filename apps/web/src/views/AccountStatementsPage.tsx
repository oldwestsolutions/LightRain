"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { listStaggerParent, staggerItem, staggerParent } from "../motion/stagger";

const ROWS = [
  { id: "2025-q4", label: "Q4 2025", sub: "Account statement" },
  { id: "2025-q3", label: "Q3 2025", sub: "Account statement" },
  { id: "2025-q2", label: "Q2 2025", sub: "Account statement" },
  { id: "2024-annual", label: "2024", sub: "Tax documents" },
] as const;

export function AccountStatementsPage() {
  const reduceMotion = useReducedMotion();
  const item = staggerItem(!!reduceMotion);
  const row = staggerItem(!!reduceMotion);

  return (
    <motion.main variants={staggerParent} initial="hidden" animate="show">
      <motion.header variants={item} className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl sm:font-medium">Statements & taxes</h1>
        <p className="mt-1 text-sm text-neutral-500">Download past statements (demo — files not generated).</p>
      </motion.header>

      <motion.ul
        variants={listStaggerParent}
        className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card divide-y divide-neutral-100 sm:rounded-[24px]"
      >
        {ROWS.map((r) => (
          <motion.li key={r.id} variants={row}>
            <motion.button
              type="button"
              whileTap={reduceMotion ? undefined : { scale: 0.995 }}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-neutral-50 sm:px-8 sm:py-4"
            >
              <span>
                <span className="block font-medium text-neutral-900">{r.label}</span>
                <span className="mt-0.5 block text-sm text-neutral-500">{r.sub}</span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-neutral-900">
                <Download className="h-4 w-4 text-neutral-500" aria-hidden />
                PDF
              </span>
            </motion.button>
          </motion.li>
        ))}
      </motion.ul>
    </motion.main>
  );
}
