import { ShopAtmosphere } from "./ShopAtmosphere";

export function ShopHero() {
  return (
    <div className="relative -mx-1 mb-12 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-950 px-6 py-14 text-white shadow-card sm:px-10 sm:py-16 md:py-20">
      <ShopAtmosphere />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" aria-hidden />
      <div className="relative z-[1] mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">LightRain Collection</p>
        <h1 className="mt-4 font-display text-3xl font-normal leading-tight tracking-[0.06em] sm:text-4xl md:text-5xl">
          Weather the system.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
          Operator-grade apparel, hardware, and artifacts — curated like infrastructure, not a mall rack. Limited runs,
          industrial finishes, and the same charcoal–mist palette you already trust on Lightra.in.
        </p>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-xs leading-relaxed text-white/45 sm:text-sm">
          Subtle drizzle and grain in this panel echo the global rain field. Nothing here replaces your keys or your
          counsel — it extends the culture of sovereign settlement.
        </p>
      </div>
    </div>
  );
}
