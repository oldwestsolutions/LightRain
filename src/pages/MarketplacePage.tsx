import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { MERCHANTS, type Merchant } from "../data/merchants";
import { listStaggerParent, staggerItem, staggerParent } from "../motion/stagger";

const typeLabel: Record<Merchant["type"], string> = {
  dispensary: "Retail",
  cultivator: "Grower",
  processor: "Processing",
};

const typeFilters: { id: "all" | Merchant["type"]; label: string }[] = [
  { id: "all", label: "All" },
  { id: "dispensary", label: "Retail" },
  { id: "cultivator", label: "Grower" },
  { id: "processor", label: "Processing" },
];

function highlightQuery(text: string, q: string) {
  const t = q.trim();
  if (!t) return text;
  const i = text.toLowerCase().indexOf(t.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-amber-100 px-0.5 text-inherit">{text.slice(i, i + t.length)}</mark>
      {text.slice(i + t.length)}
    </>
  );
}

export function MarketplacePage() {
  const reduceMotion = useReducedMotion();
  const item = staggerItem(!!reduceMotion);
  const row = staggerItem(!!reduceMotion);

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof typeFilters)[number]["id"]>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MERCHANTS.filter((m) => {
      if (typeFilter !== "all" && m.type !== typeFilter) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.region.toLowerCase().includes(q) ||
        m.federationAddress.toLowerCase().includes(q) ||
        typeLabel[m.type].toLowerCase().includes(q)
      );
    });
  }, [query, typeFilter]);

  return (
    <motion.main variants={staggerParent} initial="hidden" animate="show" className="max-w-2xl lg:max-w-3xl">
      <motion.div variants={item} className="mb-6">
        <Link
          to="/dashboard"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back to dashboard
        </Link>
      </motion.div>

      <motion.div variants={item} className="mb-6 sm:mb-8">
        <p className="mb-4 text-center text-xs text-neutral-500 sm:text-left">Marketplace</p>
        <div className="mx-auto flex w-full max-w-xl items-center gap-3 rounded-full border border-neutral-200/95 bg-white px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow focus-within:border-neutral-300 focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:px-5 sm:py-3.5">
          <Search className="h-5 w-5 shrink-0 text-neutral-400" strokeWidth={2} aria-hidden />
          <label htmlFor="marketplace-search" className="sr-only">
            Search partners
          </label>
          <input
            id="marketplace-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search partners, city, or address"
            className="min-h-[40px] w-full border-0 bg-transparent text-base text-neutral-900 outline-none placeholder:text-neutral-400 sm:text-[15px]"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
          {typeFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setTypeFilter(f.id)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                typeFilter === f.id
                  ? "border-neutral-800 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-neutral-600">
          {filtered.length === MERCHANTS.length && !query.trim() && typeFilter === "all" ? (
            <>Showing all {MERCHANTS.length} partners</>
          ) : (
            <>
              About <span className="font-medium tabular-nums">{filtered.length}</span> result
              {filtered.length !== 1 ? "s" : ""}
              {query.trim() ? (
                <>
                  {" "}
                  for <span className="font-medium">&ldquo;{query.trim()}&rdquo;</span>
                </>
              ) : null}
            </>
          )}
        </p>
      </motion.div>

      <motion.ul variants={listStaggerParent} className="space-y-6 sm:space-y-8">
        {filtered.map((m) => (
          <motion.li key={m.id} variants={row} className="border-b border-neutral-200/80 pb-6 last:border-0 last:pb-0 sm:pb-8">
            <article>
              <h2 className="text-lg font-normal leading-snug sm:text-xl">
                <span className="text-[#1a0dab] visited:text-[#681da8] hover:underline cursor-default">
                  {highlightQuery(m.name, query)}
                </span>
              </h2>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-[#006621]">
                <span className="font-mono text-[13px]">{m.federationAddress}</span>
                <span className="text-neutral-400">·</span>
                <span>
                  {typeLabel[m.type]} · {m.region}
                </span>
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700">{m.description}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-neutral-500">
                <MapPin className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                Established {m.established}
              </p>
            </article>
          </motion.li>
        ))}
      </motion.ul>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-neutral-600">
          No partners match your search. Try different words or filters.
        </p>
      )}
    </motion.main>
  );
}
