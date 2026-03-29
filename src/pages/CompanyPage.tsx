import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Laptop,
  Layers,
  Package,
  ScrollText,
  ShoppingCart,
  Unplug,
  Users,
  Wallet,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { CompanySidebar } from "../components/CompanySidebar";
import { MarketingPageShell } from "../components/MarketingPageShell";
import {
  ADVANCED_PRODUCT_CATEGORIES,
  CORE_PRODUCT_CATEGORIES,
  type CategoryAccent,
  type StoreCategoryItem,
} from "../data/storeProducts";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";

const ACCENT_BG: Record<CategoryAccent, string> = {
  slate: "from-slate-200 to-slate-400",
  zinc: "from-zinc-200 to-zinc-500",
  stone: "from-stone-200 to-stone-500",
  neutral: "from-neutral-200 to-neutral-500",
};

const ICON_MAP: Record<StoreCategoryItem["icon"], LucideIcon> = {
  wallet: Wallet,
  unplug: Unplug,
  scroll: ScrollText,
  layers: Layers,
  users: Users,
  package: Package,
  laptop: Laptop,
  "wifi-off": WifiOff,
};

const INITIAL_VISIBLE = 2;

function CategoryCard({ item, onAdd }: { item: StoreCategoryItem; onAdd: (title: string) => void }) {
  const Icon = ICON_MAP[item.icon];
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`relative aspect-[5/3] bg-gradient-to-br ${ACCENT_BG[item.accent]} flex items-center justify-center sm:aspect-[16/9]`}
      >
        <Icon className="h-14 w-14 text-white/90 drop-shadow-sm sm:h-16 sm:w-16" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base font-semibold leading-snug text-neutral-900 sm:text-lg">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
        <button
          type="button"
          onClick={() => onAdd(item.title)}
          className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
        >
          <ShoppingCart className="h-4 w-4 shrink-0" aria-hidden />
          Add to cart
        </button>
      </div>
    </article>
  );
}

export function CompanyPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const showToast = useToastStore((s) => s.show);
  const [showAllCatalog, setShowAllCatalog] = useState(false);

  const addDemo = (name: string) => {
    showToast(`Demo store — “${name}” added. Checkout not connected.`);
  };

  const previewCore = CORE_PRODUCT_CATEGORIES.slice(0, INITIAL_VISIBLE);
  const hasMore =
    CORE_PRODUCT_CATEGORIES.length > INITIAL_VISIBLE || ADVANCED_PRODUCT_CATEGORIES.length > 0;

  return (
    <MarketingPageShell
      extraWide
      backTo={isLoggedIn ? "/dashboard" : "/"}
      backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}
    >
      <div className="space-y-10 lg:space-y-12">
        {/* Full-width hero — detailed company story */}
        <article className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card">
          <div className="border-b border-neutral-100 bg-gradient-to-br from-neutral-50 via-white to-neutral-100/80 px-6 py-10 sm:px-10 sm:py-14 md:min-h-[min(78vh,640px)] md:py-16 md:flex md:flex-col md:justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Company</p>
            <h1 className="mt-3 font-display text-3xl font-normal tracking-[0.06em] text-neutral-900 sm:text-4xl md:text-5xl">
              <span className="text-neutral-900">Light</span>
              <span className="text-neutral-500">Rain</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700 sm:text-lg">
              Federation addresses and settlement tooling for high-risk commerce—so operators can move value with
              clearer rails while keeping obligations where they belong: on licensed entities, not on naive software
              promises.
            </p>
            <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted sm:text-[15px]">
              <p>
                We focus on legible federation endpoints, settlement visibility, and flows that match how regulated
                teams actually work: audits, counterparties, and network rules—not just a pretty wallet screen.
                LightRain sits in that layer between your brand and the chain: human-readable addresses, history you
                can reason about, and room to wire policy as your counsel and regulators require.
              </p>
              <p>
                The hardware catalog on this page is illustrative—styled like major commerce platforms so you can see
                how a full retail surface could pair with custody and backup categories. Checkout remains a demo until
                you connect real inventory and payments.
              </p>
            </div>
            <ul className="mt-8 grid max-w-2xl gap-3 text-sm text-neutral-800 sm:grid-cols-2 sm:text-[15px]">
              <li className="flex gap-2 rounded-xl border border-neutral-200/80 bg-white/80 px-4 py-3 shadow-sm">
                <span className="font-semibold text-neutral-900">·</span>
                <span>Federation-native addressing and settlement context</span>
              </li>
              <li className="flex gap-2 rounded-xl border border-neutral-200/80 bg-white/80 px-4 py-3 shadow-sm">
                <span className="font-semibold text-neutral-900">·</span>
                <span>Interfaces aimed at compliant, high-friction categories</span>
              </li>
              <li className="flex gap-2 rounded-xl border border-neutral-200/80 bg-white/80 px-4 py-3 shadow-sm sm:col-span-2">
                <span className="font-semibold text-neutral-900">·</span>
                <span>Policies and downloads live under Legal—review before production use</span>
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/legal"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 px-8 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Legal &amp; policies
              </Link>
              <Link
                to="/support"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-neutral-200 bg-white px-8 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
              >
                Support
              </Link>
            </div>
          </div>
        </article>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10 xl:gap-12">
          <div className="min-w-0 space-y-10">
            <section className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card">
              <div className="border-b border-neutral-200/80 bg-neutral-50/90 px-5 py-5 sm:px-8 sm:py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Shop</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
                  Hardware &amp; cold storage
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-muted">
                  Demo catalog styled like Square / BigCommerce checkout surfaces—neutral rails, clear pricing, hardware
                  shoppers expect.
                </p>
              </div>

              <div className="space-y-10 p-5 sm:p-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Core product categories</h3>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:gap-6">
                    {(showAllCatalog ? CORE_PRODUCT_CATEGORIES : previewCore).map((item) => (
                      <CategoryCard key={item.id} item={item} onAdd={addDemo} />
                    ))}
                  </div>
                  {!showAllCatalog && hasMore && (
                    <button
                      type="button"
                      onClick={() => setShowAllCatalog(true)}
                      className="mt-6 flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 sm:text-base"
                    >
                      Show more
                      <ChevronDown className="h-4 w-4" aria-hidden />
                    </button>
                  )}
                </div>

                {showAllCatalog && (
                  <>
                    <div className="border-t border-neutral-100 pt-10">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Advanced systems</h3>
                      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:gap-6">
                        {ADVANCED_PRODUCT_CATEGORIES.map((item) => (
                          <CategoryCard key={item.id} item={item} onAdd={addDemo} />
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAllCatalog(false)}
                      className="flex w-full min-h-[44px] items-center justify-center text-sm font-medium text-muted underline-offset-2 hover:text-neutral-900 hover:underline"
                    >
                      Show less
                    </button>
                  </>
                )}
              </div>
            </section>

            <div className="rounded-2xl border border-neutral-200/90 bg-white/92 p-6 text-sm text-muted shadow-card backdrop-blur-md sm:p-8 lg:hidden">
              <p className="font-medium text-neutral-900">Hated By Many LLC</p>
              <p className="mt-2 leading-relaxed">© 2026 · Demo product direction only.</p>
            </div>
          </div>

          <CompanySidebar />
        </div>
      </div>
    </MarketingPageShell>
  );
}
