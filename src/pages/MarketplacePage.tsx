import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Building2, MapPin } from "lucide-react";
import { MERCHANTS } from "../data/merchants";
import { listStaggerParent, staggerItem, staggerParent } from "../motion/stagger";

const typeLabel: Record<(typeof MERCHANTS)[number]["type"], string> = {
  dispensary: "Retail",
  cultivator: "Grower",
  processor: "Processing",
};

export function MarketplacePage() {
  const reduceMotion = useReducedMotion();
  const item = staggerItem(!!reduceMotion);
  const row = staggerItem(!!reduceMotion);

  return (
    <motion.main variants={staggerParent} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-5 sm:mb-6">
        <Link
          to="/dashboard"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back to dashboard
        </Link>
      </motion.div>
      <motion.header variants={item} className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl sm:font-medium">Marketplace</h1>
        <p className="mt-1 text-sm text-neutral-500">Browse verified partners. Demo listings only.</p>
      </motion.header>

      <motion.ul variants={listStaggerParent} className="space-y-3 sm:space-y-4">
        {MERCHANTS.map((m) => (
          <motion.li key={m.id} variants={row}>
            <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                    <Building2 className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900">{m.name}</p>
                    <p className="mt-0.5 text-sm text-neutral-500">{m.description}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 sm:text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                    {m.region}
                  </span>
                  <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
                    {typeLabel[m.type]}
                  </span>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.main>
  );
}
