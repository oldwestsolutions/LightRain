"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  mockDiscoveryHasMore,
  mockFetchDiscoveryPage,
  type MockSponsoredItem,
} from "@/lib/mockWalletDiscoveryApi";

export function DiscoveryFeed() {
  const [page, setPage] = useState(1);
  const pageRef = useRef(1);
  const [items, setItems] = useState<MockSponsoredItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const loadPage = useCallback(async (nextPage: number, append: boolean) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    try {
      const chunk = await mockFetchDiscoveryPage(nextPage);
      setItems((prev) => (append ? [...prev, ...chunk] : chunk));
      setPage(nextPage);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadPage(1, false);
  }, [loadPage]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (!hit || loading || loadingMore) return;
        const current = pageRef.current;
        if (!mockDiscoveryHasMore(current)) return;
        loadPage(current + 1, true);
      },
      { rootMargin: "120px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadPage, loading, loadingMore]);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-6 sm:px-6 sm:pt-8">
      <header className="mb-8 border-b border-neutral-100 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700/90">Sponsored</p>
        <h1 className="mt-2 font-display text-2xl font-normal tracking-tight text-neutral-900 sm:text-3xl">
          Discovery feed
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Not search results — a slow, curated lane for bored browsing. Mock sponsored placements.
        </p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-neutral-500">
          <Loader2 className="h-9 w-9 animate-spin text-accent" aria-hidden />
          <p className="text-sm">Warming up the feed…</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-6">
          {items.map((item) => (
            <li key={item.id}>
              <article className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm">
                <div className="aspect-[16/9] overflow-hidden bg-neutral-100 sm:aspect-[2/1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                      {item.sponsor}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold tracking-tight text-neutral-900">{item.title}</h2>
                  </div>
                  <a
                    href={item.href}
                    className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                  >
                    {item.ctaLabel}
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <div ref={sentinelRef} className="h-8 w-full" aria-hidden />

      {loadingMore ? (
        <div className="flex justify-center py-6 text-neutral-500">
          <Loader2 className="h-7 w-7 animate-spin text-accent" aria-label="Loading more" />
        </div>
      ) : null}

      {!loading && !mockDiscoveryHasMore(page) && items.length > 0 ? (
        <p className="py-8 text-center text-xs text-neutral-400">You&apos;ve reached the end of this demo feed.</p>
      ) : null}

      <p className="mt-6 text-center">
        <Link href="/wallet/hub" className="text-sm font-medium text-neutral-600 underline-offset-4 hover:underline">
          Back to wallet
        </Link>
      </p>
    </main>
  );
}
