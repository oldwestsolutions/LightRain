"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Search, Store, X } from "lucide-react";
import { MERCHANTS, type Merchant } from "../data/merchants";

const typeLabel: Record<Merchant["type"], string> = {
  dispensary: "Retail",
  cultivator: "Grower",
  processor: "Processing",
};

function simulateListingFetch(): Promise<void> {
  return new Promise((r) => setTimeout(r, 380 + Math.random() * 220));
}

function filterMerchants(query: string): Merchant[] {
  const q = query.trim().toLowerCase();
  return MERCHANTS.filter((m) => {
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
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [inputValue, setInputValue] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [phase, setPhase] = useState<"hero" | "results">("hero");
  const [isLoading, setIsLoading] = useState(false);

  const listingResults = useMemo(() => {
    if (phase !== "results") return [];
    return filterMerchants(activeQuery);
  }, [phase, activeQuery]);

  const commitSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      await simulateListingFetch();
      setActiveQuery(query.trim());
      setPhase("results");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const runSearch = useCallback(async () => {
    await commitSearch(inputValue);
  }, [commitSearch, inputValue]);

  const browseAll = useCallback(async () => {
    setInputValue("");
    await commitSearch("");
  }, [commitSearch]);

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
        className={`relative z-[1] mx-auto w-full px-4 pb-16 pt-2 sm:px-6 sm:pb-20 sm:pt-3 ${
          phase === "results" ? "max-w-[100rem]" : "max-w-6xl"
        }`}
      >
        <AnimatePresence mode="wait">
          {phase === "hero" ? (
            <motion.div
              key="hero"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={spring}
              className="flex flex-col"
            >
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="inline-flex min-h-[40px] min-w-0 items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
                  Back
                </button>
              </div>

              <div className="flex flex-col items-center px-2 pb-8 pt-2 text-center sm:px-4 sm:pt-4">
              <motion.div
                initial={reduceMotion ? false : { scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...spring, delay: reduceMotion ? 0 : 0.06 }}
                className="mb-2 flex items-center gap-2 text-neutral-500 sm:mb-3"
              >
                <Store className="h-5 w-5 text-indigo-500" aria-hidden />
                <span className="text-sm font-medium tracking-wide">Search</span>
              </motion.div>
              <h1 className="font-display max-w-xl text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
                Search trusted partners
              </h1>

              <div className="relative mt-6 w-full max-w-xl sm:mt-8">
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
              </div>
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
              <div className="flex flex-col gap-4 px-4 pb-12 pt-2 sm:px-8">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="inline-flex w-fit shrink-0 items-center gap-1.5 text-sm font-medium text-[#70757a] hover:text-[#202124]"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  <span>Back</span>
                </button>

                <div className="flex h-11 w-full max-w-[692px] items-stretch overflow-hidden rounded-full border border-[#dfe1e5] bg-white shadow-sm transition-shadow hover:shadow-[0_2px_8px_rgba(32,33,36,0.12)] focus-within:border-[#dfe1e5] focus-within:shadow-[0_2px_8px_rgba(32,33,36,0.18)]">
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
              </div>

              <div className="flex flex-col px-4 pb-12 sm:flex-row sm:px-8">
                <main className="max-w-none flex-1 sm:max-w-[652px]">
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
