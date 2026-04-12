import { SHOP_PRODUCTS, type ShopCategory, type ShopProduct } from "@/data/shopProducts";

const listingOrder = new Map(SHOP_PRODUCTS.map((p, i) => [p.id, i]));

export type ShopSort = "newest" | "price-asc" | "price-desc" | "popular" | "limited";

export type ShopFilters = {
  query: string;
  categories: ShopCategory[];
  priceMinCents: number | null;
  priceMaxCents: number | null;
  availability: ("in_stock" | "limited" | "sold_out")[];
  sort: ShopSort;
};

const defaultFilters: ShopFilters = {
  query: "",
  categories: [],
  priceMinCents: null,
  priceMaxCents: null,
  availability: [],
  sort: "popular",
};

export function defaultShopFilters(): ShopFilters {
  return { ...defaultFilters };
}

/** Simple fuzzy-ish score: token overlap + substring bonus. */
export function searchScore(product: ShopProduct, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 1;
  const blob = [
    product.name,
    product.tagline,
    product.description,
    product.category,
    product.slug.replace(/-/g, " "),
  ]
    .join(" ")
    .toLowerCase();

  if (blob.includes(q)) return 100 + q.length;

  const tokens = q.split(/\s+/).filter(Boolean);
  let score = 0;
  for (const t of tokens) {
    if (t.length < 2) continue;
    if (blob.includes(t)) score += 20;
    else {
      for (const word of blob.split(/\s+/)) {
        if (word.startsWith(t) || levenshtein(word, t) <= 1) score += 8;
      }
    }
  }
  return score;
}

function levenshtein(a: string, b: string): number {
  if (a.length < b.length) [a, b] = [b, a];
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const cur =
        a[i - 1] === b[j - 1]
          ? row[j - 1]!
          : 1 + Math.min(row[j - 1]!, prev, row[j]!);
      row[j - 1] = prev;
      prev = cur;
    }
    row[b.length] = prev;
  }
  return row[b.length]!;
}

export function filterAndSortProducts(products: ShopProduct[], f: ShopFilters): ShopProduct[] {
  let list = [...products];

  if (f.query.trim()) {
    const q = f.query.trim();
    list = list
      .map((p) => ({ p, s: searchScore(p, q) }))
      .filter(({ s }) => s > 0)
      .sort((a, b) => b.s - a.s)
      .map(({ p }) => p);
  }

  if (f.categories.length > 0) {
    list = list.filter((p) => f.categories.includes(p.category));
  }

  const minC = f.priceMinCents;
  if (minC != null) {
    list = list.filter((p) => p.priceCents >= minC);
  }
  const maxC = f.priceMaxCents;
  if (maxC != null) {
    list = list.filter((p) => p.priceCents <= maxC);
  }

  if (f.availability.length > 0) {
    list = list.filter((p) => f.availability.includes(p.availability));
  }

  switch (f.sort) {
    case "price-asc":
      list.sort((a, b) => a.priceCents - b.priceCents);
      break;
    case "price-desc":
      list.sort((a, b) => b.priceCents - a.priceCents);
      break;
    case "newest":
      list.sort((a, b) => (listingOrder.get(b.id) ?? 0) - (listingOrder.get(a.id) ?? 0));
      break;
    case "limited":
      list.sort((a, b) => Number(b.limitedDrop) - Number(a.limitedDrop) || b.popularity - a.popularity);
      break;
    case "popular":
    default:
      list.sort((a, b) => b.popularity - a.popularity);
      break;
  }

  return list;
}

export type SearchHighlight = { start: number; end: number };

/** Ranges to highlight in label (first match only per field). */
export function highlightRanges(text: string, query: string): SearchHighlight[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx < 0) return [];
  return [{ start: idx, end: idx + q.length }];
}
