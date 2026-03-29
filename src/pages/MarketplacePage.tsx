import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Store,
} from "lucide-react";
import { MERCHANTS, type Merchant } from "../data/merchants";

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

const suggestedSearches = [
  "Denver",
  "Seattle dispensary",
  "Greenhouse grower",
  "extraction lab",
  "Boulder",
] as const;

type Category = (typeof typeFilters)[number]["id"];

/** Simulated network delay — replace with fetch when your API exists. */
function simulateListingFetch(): Promise<void> {
  return new Promise((r) => setTimeout(r, 380 + Math.random() * 220));
}

function filterMerchants(query: string, category: Category): Merchant[] {
  const q = query.trim().toLowerCase();
  return MERCHANTS.filter((m) => {
    if (category !== "all" && m.type !== category) return false;
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.region.toLowerCase().includes(q) ||
      m.federationAddress.toLowerCase().includes(q) ||
      m.notes.toLowerCase().includes(q) ||
      typeLabel[m.type].toLowerCase().includes(q)
    );
  });
}

function cardVisual(type: Merchant["type"], id: string) {
  const n = Number(id) || 0;
  const twists = [
    "from-[#6366f1] via-[#7c3aed] to-[#4c1d95]",
    "from-[#0d9488] via-[#059669] to-[#14532d]",
    "from-[#ea580c] via-[#dc2626] to-[#7f1d1d]",
  ] as const;
  const base =
    type === "dispensary"
      ? "from-violet-500 via-fuchsia-600 to-indigo-900"
      : type === "cultivator"
        ? "from-emerald-400 via-teal-600 to-green-900"
        : "from-amber-400 via-orange-500 to-rose-900";
  return n % 3 === 0 ? base : twists[n % 3];
}

function highlight(text: string, q: string) {
  const t = q.trim();
  if (!t) return text;
  const i = text.toLowerCase().indexOf(t.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-amber-100/90 px-0.5 text-inherit">{text.slice(i, i + t.length)}</mark>
      {text.slice(i + t.length)}
    </>
  );
}

export function MarketplacePage() {
  const reduceMotion = useReducedMotion();
  const [inputValue, setInputValue] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<Category>("all");
  const [phase, setPhase] = useState<"hero" | "results">("hero");
  const [isLoading, setIsLoading] = useState(false);

  const listingResults = useMemo(() => {
    if (phase !== "results") return [];
    return filterMerchants(activeQuery, typeFilter);
  }, [phase, activeQuery, typeFilter]);

  const commitSearch = useCallback(async (query: string, category: Category) => {
    setIsLoading(true);
    try {
      await simulateListingFetch();
      setActiveQuery(query.trim());
      setTypeFilter(category);
      setPhase("results");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const runSearch = useCallback(async () => {
    await commitSearch(inputValue, typeFilter);
  }, [commitSearch, inputValue, typeFilter]);

  const browseAll = useCallback(async () => {
    setInputValue("");
    await commitSearch("", typeFilter);
  }, [commitSearch, typeFilter]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void runSearch();
    }
  };

  const spring = reduceMotion ? { duration: 0.2 } : { type: "spring" as const, stiffness: 380, damping: 32 };

  return (
    <div className="relative min-h-[100dvh] w-full">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#eef2ff] via-white to-[#faf7f2]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(99,102,241,0.12),transparent_50%)]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6">
        <Link
          to="/dashboard"
          className="mb-6 inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-white/60 hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Dashboard
        </Link>

        <AnimatePresence mode="wait">
          {phase === "hero" ? (
            <motion.div
              key="hero"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={spring}
              className="flex min-h-[min(76dvh,calc(100dvh-8rem))] flex-col items-center justify-center px-2 text-center sm:px-4"
            >
              <motion.div
                initial={reduceMotion ? false : { scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...spring, delay: reduceMotion ? 0 : 0.06 }}
                className="mb-3 flex items-center gap-2 text-neutral-500"
              >
                <Store className="h-5 w-5 text-indigo-500" aria-hidden />
                <span className="text-sm font-medium tracking-wide">Marketplace</span>
              </motion.div>
              <h1 className="font-display max-w-xl text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
                Search trusted partners
              </h1>
              <p className="mt-3 max-w-md text-sm text-neutral-600 sm:text-base">
                A clean search experience first — then listings in a marketplace-style grid. Wire your database when
                it&apos;s ready; today this uses a demo catalog with a short simulated fetch.
              </p>

              <div className="relative mt-10 w-full max-w-xl">
                <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200/90 bg-white p-2 shadow-[0_8px_40px_rgba(15,23,42,0.08)] sm:flex-row sm:items-stretch sm:rounded-full sm:p-1.5 sm:pr-2 sm:shadow-[0_12px_48px_rgba(15,23,42,0.1)]">
                  <label htmlFor="mp-search" className="sr-only">
                    Search marketplace
                  </label>
                  <div className="flex flex-1 items-center gap-3 px-4 py-2 sm:py-1">
                    <Search className="h-5 w-5 shrink-0 text-neutral-400" strokeWidth={2} aria-hidden />
                    <input
                      id="mp-search"
                      type="search"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Search by business, city, or keyword"
                      className="min-h-[48px] w-full border-0 bg-transparent text-[15px] text-neutral-900 outline-none placeholder:text-neutral-400"
                      autoComplete="off"
                      spellCheck={false}
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => void runSearch()}
                    disabled={isLoading}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-50 sm:rounded-full sm:px-8"
                  >
                    {isLoading ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Search className="h-4 w-4" aria-hidden />
                    )}
                    Search
                  </button>
                </div>
                <p className="mt-3 text-xs text-neutral-500 sm:text-sm">
                  Press Enter to query the catalog (simulated delay).
                </p>
              </div>

              <div className="mt-8 flex max-w-xl flex-wrap items-center justify-center gap-2">
                <span className="flex items-center gap-1 text-xs font-medium text-neutral-500">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden />
                  Try
                </span>
                {suggestedSearches.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      setInputValue(s);
                      void commitSearch(s, typeFilter);
                    }}
                    className="rounded-full border border-neutral-200/90 bg-white/80 px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition-colors hover:border-indigo-200 hover:bg-indigo-50/80 hover:text-indigo-900 disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-10 w-full max-w-xl border-t border-neutral-200/80 pt-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">Category</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {typeFilters.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setTypeFilter(f.id)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        typeFilter === f.id
                          ? "bg-neutral-900 text-white shadow-md"
                          : "bg-white/90 text-neutral-700 ring-1 ring-neutral-200/90 hover:ring-neutral-300"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => void browseAll()}
                  disabled={isLoading}
                  className="mt-8 text-sm font-semibold text-indigo-600 underline-offset-4 hover:underline disabled:opacity-50"
                >
                  Browse all {MERCHANTS.length} listings →
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring}
              className="w-full"
            >
              <div className="sticky top-0 z-20 -mx-4 mb-6 border-b border-neutral-200/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-md sm:-mx-6 sm:px-6 md:rounded-b-xl md:border md:border-t-0 md:shadow-md">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setPhase("hero")}
                    className="hidden shrink-0 text-sm font-medium text-neutral-500 hover:text-neutral-900 sm:inline"
                  >
                    ← New search
                  </button>
                  <div className="flex flex-1 items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 shadow-sm focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100">
                    <Search className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                    <input
                      type="search"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="min-h-[40px] flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-neutral-400"
                      placeholder="Refine search…"
                      aria-label="Search marketplace"
                    />
                    <button
                      type="button"
                      onClick={() => void runSearch()}
                      disabled={isLoading}
                      className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {isLoading ? "…" : "Search"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {typeFilters.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setTypeFilter(f.id)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          typeFilter === f.id
                            ? "bg-neutral-900 text-white"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="mx-auto mt-3 max-w-6xl text-sm text-neutral-600">
                  About <span className="font-semibold tabular-nums text-neutral-900">{listingResults.length}</span>{" "}
                  result{listingResults.length !== 1 ? "s" : ""}
                  {activeQuery ? (
                    <>
                      {" "}
                      for <span className="font-medium text-neutral-900">&ldquo;{activeQuery}&rdquo;</span>
                    </>
                  ) : (
                    <span className="text-neutral-500"> · All listings</span>
                  )}
                </p>
              </div>

              <motion.button
                type="button"
                onClick={() => setPhase("hero")}
                className="mb-4 text-sm font-medium text-indigo-600 sm:hidden"
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                ← New search
              </motion.button>

              {listingResults.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/60 py-16 text-center">
                  <p className="text-neutral-700">No listings match. Try another phrase or category.</p>
                  <button
                    type="button"
                    onClick={() => void browseAll()}
                    className="mt-4 text-sm font-semibold text-indigo-600 hover:underline"
                  >
                    Show all listings
                  </button>
                </div>
              ) : (
                <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {listingResults.map((m, i) => (
                    <motion.li
                      key={m.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...spring, delay: reduceMotion ? 0 : i * 0.04 }}
                    >
                      <article className="group h-full overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]">
                        <div className="relative aspect-square overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${cardVisual(m.type, m.id)} opacity-95 transition-transform duration-500 group-hover:scale-105`}
                            aria-hidden
                          />
                          <div className="absolute inset-0 opacity-40 mix-blend-overlay contrast-125 grayscale-[20%]" aria-hidden />
                          <button
                            type="button"
                            className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-rose-500"
                            aria-label="Save listing"
                          >
                            <Heart className="h-4 w-4" strokeWidth={2} />
                          </button>
                          <span className="absolute bottom-2 left-2 rounded-md bg-black/35 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                            {typeLabel[m.type]}
                          </span>
                        </div>
                        <div className="p-3 sm:p-3.5">
                          <h2 className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900 sm:text-[15px]">
                            {highlight(m.name, activeQuery)}
                          </h2>
                          <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                            <span className="line-clamp-1">{m.region}</span>
                          </p>
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-600">{m.description}</p>
                          <p className="mt-2 truncate font-mono text-[10px] text-neutral-400 sm:text-[11px]">
                            {m.federationAddress}
                          </p>
                          <p className="mt-2 text-[11px] text-neutral-400">Est. {m.established}</p>
                        </div>
                      </article>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
