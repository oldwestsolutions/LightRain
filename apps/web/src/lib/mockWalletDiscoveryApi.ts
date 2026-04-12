/**
 * Mock layer for future Hetzner / BigCommerce-backed discovery APIs.
 */

export type MockStoreCard = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  storeUrl: string;
};

export type MockSponsoredItem = {
  id: string;
  title: string;
  imageUrl: string;
  ctaLabel: string;
  href: string;
  sponsor: string;
};

const MOCK_STORES: MockStoreCard[] = [
  {
    id: "bc-aurora",
    name: "Aurora Apothecary",
    description: "Curated wellness picks with same-day local fulfillment.",
    imageUrl:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80&auto=format&fit=crop",
    storeUrl: "#",
  },
  {
    id: "bc-river",
    name: "Riverbend Provisions",
    description: "Small-batch goods, transparent sourcing, quiet luxury packaging.",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format&fit=crop",
    storeUrl: "#",
  },
  {
    id: "bc-north",
    name: "Northstar Supply Co.",
    description: "Operator-grade tools and merch for field teams.",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop",
    storeUrl: "#",
  },
  {
    id: "bc-mist",
    name: "Mist & Moss Market",
    description: "Seasonal drops, limited runs, obsessively photographed.",
    imageUrl:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80&auto=format&fit=crop",
    storeUrl: "#",
  },
  {
    id: "bc-slate",
    name: "Slate Street Goods",
    description: "Everyday essentials with a premium in-store pickup flow.",
    imageUrl:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80&auto=format&fit=crop",
    storeUrl: "#",
  },
  {
    id: "bc-ember",
    name: "Emberline Collective",
    description: "Community makers, rotating collaborations, surprise bundles.",
    imageUrl:
      "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&q=80&auto=format&fit=crop",
    storeUrl: "#",
  },
];

const MOCK_SPONSORED: MockSponsoredItem[] = [
  {
    id: "ad-1",
    title: "Midnight drip — limited capsule",
    imageUrl:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=900&q=80&auto=format&fit=crop",
    ctaLabel: "Shop",
    href: "#",
    sponsor: "Atlas Row",
  },
  {
    id: "ad-2",
    title: "Field notes for operators",
    imageUrl:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&q=80&auto=format&fit=crop",
    ctaLabel: "Visit",
    href: "#",
    sponsor: "Quiet Ledger Press",
  },
  {
    id: "ad-3",
    title: "Ceramic pour-over set",
    imageUrl:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=80&auto=format&fit=crop",
    ctaLabel: "Browse",
    href: "#",
    sponsor: "Still Life Studio",
  },
  {
    id: "ad-4",
    title: "Heritage wool layers",
    imageUrl:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=80&auto=format&fit=crop",
    ctaLabel: "Shop",
    href: "#",
    sponsor: "Northwind Wool",
  },
  {
    id: "ad-5",
    title: "Analog desk ritual kit",
    imageUrl:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=900&q=80&auto=format&fit=crop",
    ctaLabel: "Visit",
    href: "#",
    sponsor: "Grayline Goods",
  },
  {
    id: "ad-6",
    title: "Soft light, slow mornings",
    imageUrl:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80&auto=format&fit=crop",
    ctaLabel: "Explore",
    href: "#",
    sponsor: "Hearth & Hold",
  },
  {
    id: "ad-7",
    title: "Carbon-neutral shipping week",
    imageUrl:
      "https://images.unsplash.com/photo-1607082348824-a0ee37b05088?w=900&q=80&auto=format&fit=crop",
    ctaLabel: "Shop",
    href: "#",
    sponsor: "Greenline Cart",
  },
  {
    id: "ad-8",
    title: "Studio samples — random pull",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop",
    ctaLabel: "Visit",
    href: "#",
    sponsor: "Sample Dept.",
  },
];

function normalizeQuery(q: string): string {
  return q.trim().toLowerCase();
}

/** Simulated network delay for realistic UI states */
function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function mockSearchStores(query: string): Promise<MockStoreCard[]> {
  await delay(280);
  const q = normalizeQuery(query);
  if (!q) return MOCK_STORES.slice(0, 4);
  return MOCK_STORES.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.id.includes(q),
  );
}

const PAGE_SIZE = 4;

export async function mockFetchDiscoveryPage(page: number): Promise<MockSponsoredItem[]> {
  await delay(220);
  const start = (page - 1) * PAGE_SIZE;
  if (start >= MOCK_SPONSORED.length) return [];
  return MOCK_SPONSORED.slice(start, start + PAGE_SIZE);
}

export function mockDiscoveryHasMore(page: number): boolean {
  return page * PAGE_SIZE < MOCK_SPONSORED.length;
}
