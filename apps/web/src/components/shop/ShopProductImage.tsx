import type { ShopProduct } from "@/data/shopProducts";

const toneMap: Record<
  ShopProduct["imageTone"],
  { from: string; to: string; mist: string }
> = {
  charcoal: { from: "#27272a", to: "#18181b", mist: "rgba(148,163,184,0.15)" },
  slate: { from: "#3f3f46", to: "#27272a", mist: "rgba(148,163,184,0.2)" },
  mist: { from: "#d4d4d8", to: "#a1a1aa", mist: "rgba(255,255,255,0.35)" },
  tan: { from: "#78716c", to: "#57534e", mist: "rgba(253,230,138,0.12)" },
  moss: { from: "#4d5c4d", to: "#3f4f3f", mist: "rgba(167,243,208,0.1)" },
  storm: { from: "#334155", to: "#1e293b", mist: "rgba(148,163,184,0.18)" },
};

export function ShopProductImage({
  product,
  className = "",
  aspectClass = "aspect-[3/4]",
}: {
  product: ShopProduct;
  className?: string;
  aspectClass?: string;
}) {
  const t = toneMap[product.imageTone];
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${aspectClass} ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        style={{
          background: `linear-gradient(145deg, ${t.from} 0%, ${t.to} 55%, #0a0a0b 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 30% 20%, ${t.mist}, transparent 55%)`,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 to-transparent" />
      <p className="absolute bottom-3 left-3 right-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
        {product.slug.slice(0, 24)}
        {product.slug.length > 24 ? "…" : ""}
      </p>
    </div>
  );
}
