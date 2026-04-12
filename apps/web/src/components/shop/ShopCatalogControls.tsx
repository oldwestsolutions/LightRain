"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { SHOP_CATEGORIES, type ShopCategory } from "@/data/shopProducts";
import type { ShopFilters } from "@/lib/shopSearch";
import { searchScore } from "@/lib/shopSearch";
import { SHOP_PRODUCTS } from "@/data/shopProducts";

function toggleCat(cats: ShopCategory[], c: ShopCategory): ShopCategory[] {
  return cats.includes(c) ? cats.filter((x) => x !== c) : [...cats, c];
}

export function ShopCatalogControls({
  filters,
  onChange,
  resultCount,
}: {
  filters: ShopFilters;
  onChange: (f: ShopFilters) => void;
  resultCount: number;
}) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const suggestions = useMemo(() => {
    const q = filters.query.trim();
    if (q.length < 2) return [];
    return SHOP_PRODUCTS.map((p) => ({ p, s: searchScore(p, q) }))
      .filter(({ s }) => s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map(({ p }) => p);
  }, [filters.query]);

  const pickProduct = useCallback(
    (slug: string) => {
      window.location.href = `/shop/product/${slug}`;
    },
    []
  );

  useEffect(() => {
    if (!open) setActive(-1);
  }, [open, filters.query]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!listRef.current?.contains(e.target as Node) && !inputRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      pickProduct(suggestions[active]!.slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <label htmlFor={`shop-search-${listId}`} className="sr-only">
          Search collection
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            ref={inputRef}
            id={`shop-search-${listId}`}
            type="search"
            role="combobox"
            aria-expanded={open && suggestions.length > 0}
            aria-controls={`${listId}-results`}
            aria-activedescendant={active >= 0 ? `${listId}-opt-${active}` : undefined}
            autoComplete="off"
            placeholder="Search products, materials, drops…"
            value={filters.query}
            onChange={(e) => {
              onChange({ ...filters, query: e.target.value });
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className="w-full rounded-2xl border border-neutral-200/90 bg-white py-3.5 pl-11 pr-4 text-sm text-neutral-900 shadow-sm outline-none ring-0 transition-shadow placeholder:text-muted focus:border-neutral-400 focus:shadow-md"
          />
        </div>
        {open && suggestions.length > 0 ? (
          <div
            ref={listRef}
            id={`${listId}-results`}
            role="listbox"
            className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-neutral-200 bg-white py-1 shadow-lg"
          >
            {suggestions.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="option"
                id={`${listId}-opt-${i}`}
                aria-selected={i === active}
                className={`flex w-full flex-col items-start px-4 py-3 text-left text-sm transition-colors ${
                  i === active ? "bg-neutral-100" : "hover:bg-neutral-50"
                }`}
                onMouseEnter={() => setActive(i)}
                onClick={() => pickProduct(p.slug)}
              >
                <span className="font-medium text-neutral-900">{p.name}</span>
                <span className="text-xs text-muted">
                  {SHOP_CATEGORIES.find((x) => x.id === p.category)?.label ?? p.category}
                </span>
              </button>
            ))}
          </div>
        ) : null}
        {filters.query.trim().length >= 2 && resultCount === 0 ? (
          <p className="mt-3 text-center text-sm text-muted" role="status">
            No matches for “{filters.query.trim()}”. Try another term or clear filters.
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">Category</span>
        {SHOP_CATEGORIES.map((c) => {
          const on = filters.categories.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onChange({ ...filters, categories: toggleCat(filters.categories, c.id) })}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                on
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">Min price</label>
          <input
            type="number"
            min={0}
            step={1}
            placeholder="USD"
            value={filters.priceMinCents != null ? filters.priceMinCents / 100 : ""}
            onChange={(e) => {
              const v = e.target.value;
              onChange({
                ...filters,
                priceMinCents: v === "" ? null : Math.max(0, Math.round(Number(v) * 100) || 0),
              });
            }}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">Max price</label>
          <input
            type="number"
            min={0}
            step={1}
            placeholder="USD"
            value={filters.priceMaxCents != null ? filters.priceMaxCents / 100 : ""}
            onChange={(e) => {
              const v = e.target.value;
              onChange({
                ...filters,
                priceMaxCents: v === "" ? null : Math.max(0, Math.round(Number(v) * 100) || 0),
              });
            }}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">Availability</label>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["in_stock", "In stock"],
                ["limited", "Limited"],
                ["sold_out", "Sold out"],
              ] as const
            ).map(([id, label]) => {
              const on = filters.availability.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      availability: on
                        ? filters.availability.filter((x) => x !== id)
                        : [...filters.availability, id],
                    })
                  }
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${
                    on ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-700"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label htmlFor={`sort-${listId}`} className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
            Sort
          </label>
          <select
            id={`sort-${listId}`}
            value={filters.sort}
            onChange={(e) =>
              onChange({ ...filters, sort: e.target.value as ShopFilters["sort"] })
            }
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
          >
            <option value="popular">Popularity</option>
            <option value="newest">Newest listed</option>
            <option value="price-asc">Price · low to high</option>
            <option value="price-desc">Price · high to low</option>
            <option value="limited">Limited first</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 pt-4">
        <p className="text-sm text-muted">
          <span className="font-medium text-neutral-800">{resultCount}</span> pieces match
        </p>
        <button
          type="button"
          onClick={() =>
            onChange({
              query: "",
              categories: [],
              priceMinCents: null,
              priceMaxCents: null,
              availability: [],
              sort: "popular",
            })
          }
          className="text-sm font-medium text-neutral-700 underline-offset-2 hover:underline"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
