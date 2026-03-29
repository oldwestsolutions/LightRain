import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Cpu, ShoppingCart } from "lucide-react";
import { MarketingPageShell } from "../components/MarketingPageShell";
import { STORE_PRODUCTS, type StoreProduct } from "../data/storeProducts";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";

const ACCENT_BG: Record<StoreProduct["accent"], string> = {
  slate: "from-slate-200 to-slate-400",
  zinc: "from-zinc-200 to-zinc-500",
  stone: "from-stone-200 to-stone-500",
  neutral: "from-neutral-200 to-neutral-500",
};

type Cat = "all" | StoreProduct["category"];

const CAT_LABEL: Record<Cat, string> = {
  all: "All products",
  "cold-wallet": "Cold wallets",
  hardware: "Security keys",
  backup: "Backup & metal",
};

export function CompanyPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const showToast = useToastStore((s) => s.show);
  const [category, setCategory] = useState<Cat>("all");

  const filtered = useMemo(() => {
    if (category === "all") return STORE_PRODUCTS;
    return STORE_PRODUCTS.filter((p) => p.category === category);
  }, [category]);

  const addDemo = (name: string) => {
    showToast(`Demo store — “${name}” added. Checkout not connected.`);
  };

  return (
    <MarketingPageShell
      extraWide
      backTo={isLoggedIn ? "/dashboard" : "/"}
      backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}
    >
      <div className="space-y-10">
        <article className="rounded-2xl border border-neutral-200/90 bg-white/92 p-6 shadow-card backdrop-blur-md sm:p-8">
          <h1 className="font-display text-2xl font-normal tracking-[0.08em] text-neutral-900 sm:text-3xl">Company</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            <span className="font-display text-lg font-normal tracking-[0.06em] text-neutral-900">LightRain</span>
            {" — "}
            Federation addresses and settlement tooling for high-risk commerce.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            <Link to="/legal" className="font-medium text-accent underline-offset-2 hover:underline">
              Legal
            </Link>
          </p>
        </article>

        {/* BigCommerce / Square–style storefront */}
        <section className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card">
          <div className="border-b border-neutral-200/80 bg-neutral-50/90 px-5 py-5 sm:px-8 sm:py-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Shop</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
                  Hardware & cold storage
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-muted">
                  Demo catalog styled like Square / BigCommerce checkout surfaces—neutral rails, clear pricing, hardware
                  shoppers expect.
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {(Object.keys(CAT_LABEL) as Cat[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    category === c
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  {CAT_LABEL[c]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:gap-6 sm:p-8 lg:grid-cols-3">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`relative aspect-[4/3] bg-gradient-to-br ${ACCENT_BG[p.accent]} flex items-center justify-center`}
                >
                  <Cpu className="h-16 w-16 text-white/90 drop-shadow-sm sm:h-20 sm:w-20" aria-hidden />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-800 shadow-sm">
                    {p.category === "cold-wallet"
                      ? "Cold wallet"
                      : p.category === "backup"
                        ? "Backup"
                        : "Hardware"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-base font-semibold text-neutral-900 sm:text-lg">{p.name}</h3>
                  <p className="mt-1 flex-1 text-sm leading-snug text-muted">{p.tagline}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
                    <span className="text-lg font-semibold tabular-nums text-neutral-900">{p.price}</span>
                    <button
                      type="button"
                      onClick={() => addDemo(p.name)}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
                    >
                      <ShoppingCart className="h-4 w-4 shrink-0" aria-hidden />
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-neutral-200/90 bg-white/92 p-6 text-sm text-muted shadow-card backdrop-blur-md sm:p-8">
          <p className="font-medium text-neutral-900">Hated By Many LLC</p>
          <p className="mt-2 leading-relaxed">© 2026 · Demo product direction only.</p>
          <p className="mt-3">
            <a
              href="mailto:press@lightrain.in"
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              press@lightrain.in
            </a>
          </p>
        </div>
      </div>
    </MarketingPageShell>
  );
}
