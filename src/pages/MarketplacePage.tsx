import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Search, Sparkles, Store, X } from "lucide-react";
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

function displayBreadcrumb(m: Merchant) {
  const host = "lightrain.in";
  const handle = m.federationAddress.split("*")[0] ?? m.federationAddress;
  return `${host} › partners › ${handle}`;
}

function highlight(text: string, q: string) {
  const t = q.trim();
  if (!t) return text;
  const i = text.toLowerCase().indexOf(t.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-amber-100/90 px-0.5 text-inherit not-italic">{text.slice(i, i + t.length)}</mark>
      {text.slice(i + t.length)}
    </>
  );
}

function buildSnippet(m: Merchant, q: string): string {
  const n = m.notes.length > 120 ? `${m.notes.slice(0, 117)}…` : m.notes;
  const base = `${m.description} — ${n}`;
  if (!q.trim()) return base;
  const lower = base.toLowerCase();
  const idx = lower.indexOf(q.trim().toLowerCase());
  if (idx <= 40) return base;
  return `… ${base.slice(Math.max(0, idx - 20))}`;
}

export function MarketplacePage() {
  const reduceMotion = useReducedMotion();
  const [inputValue, setInputValue] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<Category>("all");
  const [phase, setPhase] = useState<"hero" | "results">("hero");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearchSeconds, setLastSearchSeconds] = useState<number | null>(null);

  const listingResults = useMemo(() => {
    if (phase !== "results") return [];
    return filterMerchants(activeQuery, typeFilter);
  }, [phase, activeQuery, typeFilter]);

  const commitSearch = useCallback(async (query: string, category: Category) => {
    setIsLoading(true);
    const t0 = performance.now();
    try {
      await simulateListingFetch();
      setActiveQuery(query.trim());
      setTypeFilter(category);
      setPhase("results");
      setLastSearchSeconds(Math.round(((performance.now() - t0) / 1000) * 100) / 100);
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
    <div
      className={`relative min-h-[100dvh] w-full ${phase === "results" ? "bg-[#fff] text-[#202124]" : ""}`}
    >
      {phase === "hero" && (
        <>
          <div
            className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#eef2ff] via-white to-[#faf7f2]"
            aria-hidden
          />
          <div
            className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(99,102,241,0.12),transparent_50%)]"
            aria-hidden
          />
        </>
      )}

      <div
        className={`relative z-[1] mx-auto w-full px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 ${
          phase === "results" ? "max-w-[100rem]" : "max-w-6xl"
        }`}
      >
        {phase === "hero" && (
          <Link
            to="/dashboard"
            className="mb-6 inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-white/60 hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            Dashboard
          </Link>
        )}

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
                Start here — results open in a Google-style page with organic listings. Hook up your database when
                it&apos;s ready.
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
                <p className="mt-3 text-xs text-neutral-500 sm:text-sm">Press Enter to search (simulated delay).</p>
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
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={spring}
              className="w-full"
            >
              {/* Google-style header */}
              <header className="sticky top-0 z-30 border-b border-[#ebebeb] bg-white">
                <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-3.5">
                  <div className="flex items-center gap-4 sm:min-w-[140px]">
                    <button
                      type="button"
                      onClick={() => setPhase("hero")}
                      className="text-left text-xl font-normal tracking-tight text-[#202124]"
                      aria-label="New search"
                    >
                      Light<span className="text-accent">Rain</span>
                    </button>
                    <Link
                      to="/dashboard"
                      className="hidden text-sm text-[#70757a] hover:underline sm:inline"
                    >
                      Dashboard
                    </Link>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-2 sm:max-w-[692px]">
                    <div className="flex h-11 w-full items-stretch overflow-hidden rounded-full border border-[#dfe1e5] bg-white shadow-sm transition-shadow hover:shadow-[0_2px_8px_rgba(32,33,36,0.12)] focus-within:border-[#dfe1e5] focus-within:shadow-[0_2px_8px_rgba(32,33,36,0.18)]">
                      <div className="flex flex-1 items-center gap-2 pl-4 pr-1">
                        <Search className="h-4 w-4 shrink-0 text-[#9aa0a6]" strokeWidth={2} aria-hidden />
                        <input
                          type="search"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="min-h-[40px] flex-1 border-0 bg-transparent text-base text-[#202124] outline-none placeholder:text-[#70757a]"
                          placeholder="Search"
                          aria-label="Search"
                          autoComplete="off"
                          disabled={isLoading}
                        />
                        {inputValue ? (
                          <button
                            type="button"
                            onClick={() => setInputValue("")}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#70757a] hover:bg-[#f1f3f4]"
                            aria-label="Clear search"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => void runSearch()}
                        disabled={isLoading}
                        className="border-l border-[#ebebeb] bg-[#f8f9fa] px-5 text-sm font-medium text-[#202124] transition-colors hover:bg-[#f1f3f4] disabled:opacity-50 sm:px-6"
                      >
                        {isLoading ? "…" : "Search"}
                      </button>
                    </div>

                    <nav className="-mb-px flex gap-1 overflow-x-auto border-b border-[#ebebeb] pb-px sm:gap-6" aria-label="Result categories">
                      {typeFilters.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setTypeFilter(f.id)}
                          className={`whitespace-nowrap border-b-2 px-2 py-2 text-sm transition-colors sm:px-0 ${
                            typeFilter === f.id
                              ? "border-[#1a73e8] font-medium text-[#1a73e8]"
                              : "border-transparent text-[#70757a] hover:text-[#202124]"
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </header>

              <motion.button
                type="button"
                onClick={() => setPhase("hero")}
                className="my-3 px-4 text-sm text-[#1a0dab] hover:underline sm:hidden"
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                ← New search
              </motion.button>

              <div className="flex flex-col px-4 pb-12 sm:flex-row sm:px-8">
                <main className="max-w-none flex-1 sm:max-w-[652px]">
                  <div className="border-b border-[#ebebeb] py-3">
                    <p className="text-sm text-[#70757a]">
                      About{" "}
                      <span className="font-medium text-[#202124]">
                        {listingResults.length.toLocaleString()}
                      </span>{" "}
                      results
                      {lastSearchSeconds != null && (
                        <span className="text-[#70757a]"> ({lastSearchSeconds} seconds)</span>
                      )}
                      {activeQuery ? (
                        <>
                          {" "}
                          for{" "}
                          <span className="font-medium text-[#202124]">
                            &ldquo;{activeQuery}&rdquo;
                          </span>
                        </>
                      ) : null}
                    </p>
                  </div>

                  {listingResults.length === 0 ? (
                    <div className="py-14">
                      <p className="text-base leading-relaxed text-[#202124]">No results found for your search.</p>
                      <p className="mt-2 text-sm text-[#70757a]">
                        Try different keywords or a broader category tab.
                      </p>
                      <button
                        type="button"
                        onClick={() => void browseAll()}
                        className="mt-4 text-sm text-[#1a0dab] hover:underline"
                      >
                        Show all listings
                      </button>
                    </div>
                  ) : (
                    <ol className="list-none space-y-8 py-6">
                      {listingResults.map((m, i) => (
                        <motion.li
                          key={m.id}
                          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ ...spring, delay: reduceMotion ? 0 : Math.min(i, 8) * 0.03 }}
                        >
                          <article className="max-w-[652px]">
                            <div className="mb-1 flex items-start gap-3">
                              <div
                                className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f1f3f4] text-xs font-semibold text-[#5f6368]"
                                aria-hidden
                              >
                                {(m.name.slice(0, 1) || "?").toUpperCase()}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm text-[#202124]">{m.name}</p>
                                <p className="truncate text-xs leading-snug text-[#006621]">
                                  {displayBreadcrumb(m)}
                                </p>
                              </div>
                            </div>
                            <h2 className="mt-1 text-xl font-normal leading-snug">
                              <button
                                type="button"
                                className="inline-block text-left text-[#1a0dab] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]/40 focus-visible:ring-offset-2"
                              >
                                {highlight(m.name, activeQuery)} — {typeLabel[m.type]} · {m.region}
                              </button>
                            </h2>
                            <p className="mt-1 text-sm leading-relaxed text-[#4d5156]">
                              <span className="font-medium text-[#202124]">{m.established}</span>
                              {" · "}
                              {highlight(buildSnippet(m, activeQuery), activeQuery)}
                            </p>
                          </article>
                        </motion.li>
                      ))}
                    </ol>
                  )}
                </main>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
