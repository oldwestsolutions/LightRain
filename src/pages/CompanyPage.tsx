import { Link } from "react-router-dom";
import {
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

        <section className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card">
          <div className="border-b border-neutral-200/80 bg-neutral-50/90 px-5 py-5 sm:px-8 sm:py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Shop</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
              Hardware & cold storage
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              Catalog layout inspired by Square / BigCommerce—categories below with clear, simple copy.
            </p>
          </div>

          <div className="space-y-10 p-5 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Core product categories</h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:gap-6">
                {CORE_PRODUCT_CATEGORIES.map((item) => (
                  <CategoryCard key={item.id} item={item} onAdd={addDemo} />
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Advanced systems</h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:gap-6">
                {ADVANCED_PRODUCT_CATEGORIES.map((item) => (
                  <CategoryCard key={item.id} item={item} onAdd={addDemo} />
                ))}
              </div>
            </div>
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
