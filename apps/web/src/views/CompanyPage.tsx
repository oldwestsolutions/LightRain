"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Check,
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
import { URL_SUPPORT } from "@/lib/site";
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

/** Full-viewport band inside padded shell (MarketingPageShell has overflow-x-hidden). */
function FullBleedSection({
  children,
  className = "",
  id,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative left-1/2 right-auto -translate-x-1/2 w-screen max-w-[100vw] ${className}`}
    >
      {children}
    </section>
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
      <div className="space-y-0">
        {/* Immersive hero — homepage-style, no illustration */}
        <FullBleedSection
          className="border-y border-neutral-200/60 bg-gradient-to-b from-white via-neutral-50/95 to-neutral-100/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
          ariaLabel="LightRain company hero"
        >
          <div className="flex min-h-[min(92svh,900px)] flex-col justify-center px-5 py-16 sm:px-10 sm:py-20 md:py-24">
            <div className="mx-auto w-full max-w-4xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">LightRain</p>
              <h1 className="mt-5 font-display text-[2.35rem] font-normal leading-tight tracking-[0.08em] text-neutral-900 sm:text-5xl md:text-6xl md:tracking-[0.1em]">
                Light<span className="text-accent">Rain</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base font-medium leading-relaxed text-neutral-700 sm:text-lg">
                Private Discretionary Blockchain Ledger
              </p>
              <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-[1.7] text-neutral-600 sm:text-[1.05rem]">
                Federation addresses and settlement tooling for high-risk commerce—so operators can move value with
                clearer rails while keeping obligations where they belong: on licensed entities, not on naive software
                promises.
              </p>
              <div className="mx-auto mt-10 max-w-2xl space-y-5 text-left text-sm leading-[1.75] text-neutral-600 sm:text-[15px] md:text-center md:text-pretty">
                <p>
                  We focus on legible federation endpoints, settlement visibility, and flows that match how regulated
                  teams actually work: audits, counterparties, and network rules—not just a pretty wallet screen.
                  LightRain sits in that layer between your brand and the chain: human-readable addresses, history you
                  can reason about, and room to wire policy as your counsel and regulators require.
                </p>
                <p>
                  The hardware catalog below is illustrative—styled like major commerce platforms so you can see how a
                  full retail surface could pair with custody and backup categories. Checkout remains a demo until you
                  connect real inventory and payments.
                </p>
              </div>
              <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
                {[
                  "Federation-native addressing and settlement context",
                  "Interfaces aimed at compliant, high-friction categories",
                  "Policies and downloads under Legal—review before production use",
                ].map((text) => (
                  <li
                    key={text}
                    className="flex gap-3 rounded-2xl border border-neutral-200/90 bg-white/90 px-4 py-4 text-left shadow-sm ring-1 ring-black/[0.03] backdrop-blur-sm"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-900" strokeWidth={2.5} aria-hidden />
                    <span className="text-sm leading-snug text-neutral-800">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
                <Link
                  href="/legal"
                  className="inline-flex min-h-[52px] min-w-[180px] items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 px-10 text-sm font-semibold text-white shadow-md transition-colors hover:bg-neutral-800"
                >
                  Legal &amp; policies
                </Link>
                <a
                  href={URL_SUPPORT}
                  className="inline-flex min-h-[52px] min-w-[160px] items-center justify-center rounded-full border border-neutral-300/90 bg-white/90 px-10 text-sm font-semibold text-neutral-800 shadow-sm backdrop-blur-sm transition-colors hover:border-neutral-400 hover:bg-white"
                >
                  Support
                </a>
              </div>
            </div>
          </div>
        </FullBleedSection>

        {/* Second immersive band — depth without illustration */}
        <FullBleedSection
          className="mt-0 border-b border-neutral-200/50 bg-gradient-to-br from-neutral-100/95 via-white to-neutral-50"
          id="company-why"
          ariaLabel="Why LightRain"
        >
          <div className="flex min-h-[min(78svh,720px)] flex-col justify-center px-5 py-16 sm:px-10 sm:py-20">
            <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
              <div>
                <h2 className="font-display text-3xl font-normal tracking-[0.06em] text-neutral-900 sm:text-4xl">
                  Built for desks that ship under scrutiny
                </h2>
                <p className="mt-6 text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
                  Every screen is tuned for operators who answer to risk, legal, and treasury—not just engineering.
                  Federation labels, settlement history, and export paths are first-class so your story stays coherent
                  when someone asks “show me how this moved.”
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
                {[
                  { k: "Rails", v: "Discretionary", d: "Policy hooks where your team expects them." },
                  { k: "Surface", v: "Legible", d: "Addresses and context humans can defend in email." },
                  { k: "Posture", v: "Compliant-first", d: "Flows shaped for high-friction categories." },
                ].map((item) => (
                  <div
                    key={item.k}
                    className="rounded-2xl border border-neutral-200/90 bg-white/95 p-6 shadow-card ring-1 ring-black/[0.02]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{item.k}</p>
                    <p className="mt-2 font-display text-2xl font-normal text-neutral-900">{item.v}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FullBleedSection>

        {/* Journey — full-width dark immersive */}
        <FullBleedSection
          className="border-b border-neutral-900/20 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white"
          id="company-journey"
          ariaLabel="From signal to settlement"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(120,170,255,0.25), transparent 55%), radial-gradient(ellipse 70% 45% at 100% 80%, rgba(255,200,140,0.08), transparent 50%)",
              }}
            />
          </div>
          <div className="relative flex min-h-[min(82svh,760px)] flex-col justify-center px-5 py-16 sm:px-10 sm:py-20">
            <h2 className="mx-auto max-w-3xl text-center font-display text-3xl font-normal tracking-[0.06em] sm:text-4xl">
              From signal to settlement
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/70 sm:text-[15px]">
              A guided path for teams who cannot afford ambiguous rails—each step leaves an audit trail you can
              defend.
            </p>
            <ol className="mx-auto mt-14 grid w-full max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "01", title: "Addressing", body: "Federation labels and endpoints that humans and systems agree on." },
                { step: "02", title: "Policy", body: "Wire your obligations where counsel expects—not as an afterthought." },
                { step: "03", title: "Execution", body: "Settlement surfaces that mirror how regulated desks already work." },
                { step: "04", title: "Evidence", body: "History and exports shaped for review, not just screenshots." },
              ].map((item) => (
                <li
                  key={item.step}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-lg backdrop-blur-sm"
                >
                  <span className="font-mono text-xs font-bold text-amber-200/90">{item.step}</span>
                  <p className="mt-3 font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </FullBleedSection>

        {/* Catalog + sidebar — existing design language */}
        <FullBleedSection className="bg-canvas py-14 sm:py-16 lg:py-20" ariaLabel="Hardware and cold storage catalog">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10 xl:gap-12">
              <div className="min-w-0 space-y-10">
                <section className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card">
                  <div className="border-b border-neutral-200/80 bg-neutral-50/90 px-5 py-5 sm:px-8 sm:py-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Shop</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
                      Hardware &amp; cold storage
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-muted">
                      Demo catalog styled like Square / BigCommerce checkout surfaces—neutral rails, clear pricing,
                      hardware shoppers expect.
                    </p>
                  </div>

                  <div className="space-y-10 p-5 sm:p-8">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                        Core product categories
                      </h3>
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
                          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                            Advanced systems
                          </h3>
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
        </FullBleedSection>
      </div>
    </MarketingPageShell>
  );
}
