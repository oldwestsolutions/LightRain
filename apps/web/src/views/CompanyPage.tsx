"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  FileText,
  KeyRound,
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

/** Company narrative column: full-height dark panel (no empty gray band above). */
function CompanyHeroAside() {
  return (
    <div className="relative flex min-h-[280px] w-full flex-col justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 lg:min-h-[min(62vh,520px)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 100% 60% at 0% 0%, rgba(255,255,255,0.12), transparent 55%), radial-gradient(ellipse 80% 50% at 100% 100%, rgba(100,180,255,0.1), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative px-5 py-10 text-center text-white sm:px-6 sm:py-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">company.lightra.in</p>
        <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-white/80 sm:text-[15px]">
          LightRain is settlement infrastructure with a Bitcoin mindset: keys stay yours, history stays legible, and
          policy lives where regulators expect it—not buried in anonymous wallet chrome.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-sm sm:text-xs">
            Federation-native
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-sm sm:text-xs">
            Discretionary rails
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-sm sm:text-xs">
            Operator-grade UX
          </span>
        </div>
      </div>
    </div>
  );
}

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
      compactTop
      backTo={isLoggedIn ? "/dashboard" : "/"}
      backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}
    >
      <div className="space-y-6 lg:space-y-8">
        <article className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_24px_60px_-12px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04]">
          <div className="grid lg:min-h-[min(62vh,520px)] lg:grid-cols-[minmax(0,1.12fr)_minmax(300px,44%)] xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,40%)]">
            <div className="flex flex-col justify-center border-b border-neutral-100 bg-gradient-to-br from-neutral-50 via-white to-neutral-50/90 px-6 py-8 sm:px-10 sm:py-10 lg:border-b-0 lg:border-r lg:border-neutral-100 lg:px-12 lg:py-12 xl:px-14 xl:py-14">
              <div className="w-full max-w-none">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-neutral-200/80 pb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">LightRain</p>
                  <span className="hidden h-4 w-px bg-neutral-200 sm:block" aria-hidden />
                  <p className="text-xs font-medium text-neutral-500">Bitcoin wallet for everyone</p>
                </div>
                <h1 className="mt-8 font-display text-3xl font-normal tracking-[0.05em] text-neutral-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.1] lg:text-5xl">
                  <span className="text-neutral-900">Light</span>
                  <span className="text-neutral-500">Rain</span>
                </h1>
                <p className="mt-6 w-full text-pretty text-base leading-[1.65] text-neutral-800 sm:text-lg lg:text-[1.125rem] lg:leading-[1.7]">
                  Your Bitcoin, your keys, your clear history. LightRain is a wallet experience built for everyday
                  holders who still want grown-up infrastructure: readable addresses, transparent activity, and flows
                  that feel as serious as the savings they protect.
                </p>
                <div className="mt-8 w-full space-y-5 text-sm leading-[1.7] text-neutral-600 sm:text-[15px]">
                  <p className="text-pretty">
                    Send and receive with human-friendly federation-style labels, see what actually moved on-chain, and
                    pair optional hardware and backups the way long-term stackers already do—without handing the story
                    of your money to a black box you cannot explain to a friend or a tax preparer.
                  </p>
                  <p className="text-pretty">
                    Curious how it could feel next to real shopping? The hardware grid below is a demo storefront—browse
                    cold-storage gear and accessories the way you would on a major retailer, then wire real inventory
                    when you are ready. Checkout here stays a preview until you connect production payments.
                  </p>
                </div>
                <ul className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
                  <li className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200/90 bg-white/90 px-5 py-8 text-center shadow-sm ring-1 ring-black/[0.03]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-inner">
                      <KeyRound className="h-7 w-7" aria-hidden />
                    </div>
                    <span className="mt-4 text-sm font-semibold tracking-wide text-neutral-900">Key</span>
                  </li>
                  <li className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200/90 bg-white/90 px-5 py-8 text-center shadow-sm ring-1 ring-black/[0.03]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-inner">
                      <Wallet className="h-7 w-7" aria-hidden />
                    </div>
                    <span className="mt-4 text-sm font-semibold tracking-wide text-neutral-900">Wallet</span>
                  </li>
                  <li className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200/90 bg-white/90 px-5 py-8 text-center shadow-sm ring-1 ring-black/[0.03] sm:col-span-1">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-inner">
                      <FileText className="h-7 w-7" aria-hidden />
                    </div>
                    <span className="mt-4 text-sm font-semibold tracking-wide text-neutral-900">Federation</span>
                  </li>
                </ul>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-start">
                  <Link
                    href="/governance"
                    className="inline-flex min-h-[48px] min-w-[140px] flex-1 items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 sm:flex-none"
                  >
                    Governance
                  </Link>
                  <Link
                    href="/whitepaper"
                    className="inline-flex min-h-[48px] min-w-[140px] flex-1 items-center justify-center rounded-full border border-neutral-200 bg-white px-8 text-sm font-semibold text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 sm:flex-none"
                  >
                    Whitepaper
                  </Link>
                </div>
              </div>
            </div>
            <CompanyHeroAside />
          </div>
        </article>

        <section
          className="rounded-2xl border border-neutral-200/90 bg-gradient-to-b from-neutral-50/95 to-white px-5 py-8 shadow-inner sm:px-8 sm:py-10"
          aria-labelledby="assurance-teaser-heading"
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <h2
                id="assurance-teaser-heading"
                className="font-display text-xl font-normal tracking-[0.06em] text-neutral-900 sm:text-2xl"
              >
                Assurance layers
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
                ML-assisted signals for federation integrity, baselines, device and key anomalies, policy-aligned
                warnings, execution telemetry, and evidence-grade logging—assistive only; no automated compliance or flow
                execution.
              </p>
            </div>
            <Link
              href="/assurance-layers"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Read documentation
            </Link>
          </div>
        </section>

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
