"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { mockSearchStores, type MockStoreCard } from "@/lib/mockWalletDiscoveryApi";

type Props = {
  query: string;
};

export function StoreResults({ query }: Props) {
  const [items, setItems] = useState<MockStoreCard[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    setItems(null);
    mockSearchStores(query).then((res) => {
      if (!cancelled) setItems(res);
    });
    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
      <header className="mb-8 border-b border-neutral-100 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Search</p>
        <h1 className="mt-2 font-display text-2xl font-normal tracking-tight text-neutral-900 sm:text-3xl">
          {query ? (
            <>
              Results for <span className="text-accent">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            "Store previews"
          )}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-500">
          BigCommerce storefront previews (mock data). Replace with Hetzner-backed results when the API is ready.
        </p>
      </header>

      {items === null ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-neutral-500">
          <Loader2 className="h-9 w-9 animate-spin text-accent" aria-hidden />
          <p className="text-sm">Loading stores…</p>
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-neutral-200/90 bg-neutral-50 py-16 text-center text-sm text-neutral-500">
          No stores matched that query. Try another phrase.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((store) => (
            <li key={store.id}>
              <article className="group overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm transition-shadow hover:shadow-md">
                <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={store.imageUrl}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h2 className="text-lg font-semibold tracking-tight text-neutral-900">{store.name}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">{store.description}</p>
                  <a
                    href={store.storeUrl}
                    className="mt-4 inline-flex text-sm font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    View storefront
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-10 text-center">
        <Link href="/wallet/hub" className="text-sm font-medium text-neutral-600 underline-offset-4 hover:underline">
          Back to wallet
        </Link>
      </p>
    </main>
  );
}
