/**
 * LightRain Collection — placeholder catalog (production-ready structure).
 * Copy: operator-grade, cyber-weather, sovereign infrastructure tone.
 */

export type ShopCategory = "apparel" | "hardware" | "accessories" | "tech" | "limited";

export type Availability = "in_stock" | "limited" | "sold_out";

export type ProductColor = { id: string; label: string; hex: string };

export type ShopProduct = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  materials: string;
  sizing: string;
  shippingNote: string;
  care: string;
  priceCents: number;
  compareAtCents?: number;
  category: ShopCategory;
  availability: Availability;
  featured: boolean;
  /** Genesis-style runway / seasonal */
  limitedDrop: boolean;
  /** 1–100 for default sort */
  popularity: number;
  colors: ProductColor[];
  sizes: string[];
  /** Gradient accent for image placeholder (design-system aligned) */
  imageTone: "charcoal" | "slate" | "mist" | "tan" | "moss" | "storm";
};

export const SHOP_CATEGORIES: { id: ShopCategory; label: string; blurb: string }[] = [
  { id: "apparel", label: "Apparel", blurb: "Layered for operators. Weather-facing cuts, industrial finish." },
  { id: "hardware", label: "Hardware", blurb: "Tools and edges. Field-grade, no toy aesthetics." },
  { id: "accessories", label: "Accessories", blurb: "Desk, travel, and trail. Quietly sovereign." },
  { id: "tech", label: "Tech Accessories", blurb: "Cables, power, protection — operator grid discipline." },
  { id: "limited", label: "Limited Drops", blurb: "Low-run capsules. When they clear, they clear." },
];

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "op-hoodie",
    slug: "lightrain-operator-hoodie",
    name: "LightRain Operator Hoodie",
    tagline: "Heavyweight calm for long sessions at the rail.",
    description:
      "Oversized hood, brushed interior, and a silhouette that reads infrastructure—not merch table. Wears like equipment.",
    longDescription:
      "Built for the kind of nights where settlement windows and federation rotations stack up. Dense cotton fleece, double-lined hood, and flatlock seams that survive repeated wash cycles without turning into costume. The mark is tonal: visible to those who know the stack, invisible to everyone else.",
    materials: "80% cotton / 20% polyester fleece. Garment-dyed charcoal and mist variants.",
    sizing: "Relaxed operator fit. Size up for layer room under a shell. See chart: chest 34–48\" across XS–XXL.",
    shippingNote: "Ships folded in weather-sealed mailer. Signature required on request.",
    care: "Cold wash, hang dry preferred. Tumble low if you must—expect minimal character fade.",
    priceCents: 12800,
    compareAtCents: 14800,
    category: "apparel",
    availability: "in_stock",
    featured: true,
    limitedDrop: false,
    popularity: 88,
    colors: [
      { id: "charcoal", label: "Charcoal Mist", hex: "#2d2d32" },
      { id: "fog", label: "Fog", hex: "#e8e6e3" },
      { id: "tan", label: "Operator Tan", hex: "#c4a574" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    imageTone: "charcoal",
  },
  {
    id: "drizzle-jacket",
    slug: "lightrain-drizzle-jacket",
    name: "LightRain Drizzle Jacket",
    tagline: "Shell logic: light rain, city wind, server-room cold.",
    description:
      "DWR-treated ripstop with matte hardware. Packable collar stow. Looks like policy documentation feels: tight, intentional.",
    longDescription:
      "We designed this for the gap between datacenter chill and sidewalk drizzle—where most ‘tech jackets’ look like cosplay. Taped critical seams, two-way zip, interior stash for a slim signer or notebook. Weather metaphor made literal without turning you into a billboard.",
    materials: "Nylon ripstop shell, DWR coating. Mesh-lined body. YKK Matte zippers.",
    sizing: "Trim through shoulders; room in torso. In between sizes: size up for layers.",
    shippingNote: "Hanger ship available (US only) — select at checkout notes.",
    care: "Spot clean shell; machine cold gentle if needed. Re-DWR after heavy season.",
    priceCents: 18900,
    category: "apparel",
    availability: "in_stock",
    featured: true,
    limitedDrop: false,
    popularity: 82,
    colors: [
      { id: "black", label: "Blackout", hex: "#1a1a1c" },
      { id: "slate", label: "Slate Fog", hex: "#4b5563" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageTone: "storm",
  },
  {
    id: "storm-shoes",
    slug: "lightrain-stormrunner-shoes",
    name: "LightRain StormRunner Shoes",
    tagline: "Grip for wet concrete and the long walk to the desk.",
    description:
      "Low-profile runner with weatherized upper and reflective drizzle-line detail. Not performance marketing—actual puddle tolerance.",
    longDescription:
      "StormRunner is the shoe we wanted for travel between custody-adjacent meetings and the places you actually sign. Cushioned midsole, siped outsole, upper that does not surrender at the first mist. Subtle reflective hits for night egress—never loud.",
    materials: "Synthetic weather upper, rubber outsole, recycled mesh lining.",
    sizing: "US men’s 8–12 (whole sizes). Runs half-size snug; size up if between.",
    shippingNote: "Box inside shipper; try indoors before committing — see returns policy.",
    care: "Brush dry; avoid heat on upper. Insoles removable for air-out.",
    priceCents: 16500,
    category: "apparel",
    availability: "limited",
    featured: true,
    limitedDrop: false,
    popularity: 76,
    colors: [
      { id: "graphite", label: "Graphite Rain", hex: "#374151" },
      { id: "bone", label: "Bone Mist", hex: "#d6d3d1" },
    ],
    sizes: ["8", "9", "10", "11", "12"],
    imageTone: "slate",
  },
  {
    id: "mist-tee",
    slug: "lightrain-mist-tee",
    name: "LightRain Mist Tee",
    tagline: "Fine-gauge jersey. Tonal mark. Heat that breathes.",
    description:
      "Supima-weight hand, minimal neck bind, drop shoulder. The tee you pack when you do not want to look like you bought a billboard.",
    longDescription:
      "Mist is about opacity: the mark sits in discharge ink one shade off the body color—readable under direct light, quiet in mixed rooms. For operators who treat identity as infrastructure, not flair.",
    materials: "100% combed cotton. Pre-shrunk body; expect ~3% length settle.",
    sizing: "True to size; athletic build may prefer one down for fitted.",
    shippingNote: "Flat pack; carbon-offset option at checkout when available.",
    care: "Cold wash inside out. No bleach. Low tumble or line dry.",
    priceCents: 4800,
    category: "apparel",
    availability: "in_stock",
    featured: false,
    limitedDrop: false,
    popularity: 70,
    colors: [
      { id: "white", label: "Mist White", hex: "#f4f4f5" },
      { id: "black", label: "Void", hex: "#18181b" },
      { id: "sage", label: "Moss Readout", hex: "#6b7c6b" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    imageTone: "mist",
  },
  {
    id: "op-hat",
    slug: "lightrain-operator-hat",
    name: "LightRain Operator Hat",
    tagline: "Low crown, unstructured, rain-ready brim.",
    description:
      "Washed cotton twill, tonal embroidery, antique brass closure. Wears in, not out.",
    longDescription:
      "We avoided the trucker trap. This is a six-panel with a shallow crown so it sits clean under hoods and headsets. Embroidery thread matches brim tape—small detail, long shelf life.",
    materials: "100% cotton twill. Sweatband: cotton twill.",
    sizing: "One size; adjustable strap 55–62 cm.",
    shippingNote: "Crush-friendly mailer.",
    care: "Spot clean; reshape brim while damp if needed.",
    priceCents: 3800,
    category: "apparel",
    availability: "in_stock",
    featured: false,
    limitedDrop: false,
    popularity: 62,
    colors: [
      { id: "black", label: "Black", hex: "#27272a" },
      { id: "tan", label: "Tan", hex: "#b8956a" },
    ],
    sizes: ["ONE"],
    imageTone: "tan",
  },
  {
    id: "genesis-jacket",
    slug: "lightrain-genesis-drop-jacket",
    name: "LightRain Genesis Drop Jacket",
    tagline: "Limited run. Numbered hang tag. Origin-story weight.",
    description:
      "Waxed cotton body, corduroy collar, interior map print of federation topology (abstract). When the run ends, the pattern does not repeat.",
    longDescription:
      "Genesis is the capsule we point to when people ask if LightRain ‘does culture.’ It does—but only as artifact, not hype. Each piece carries a serialized tag tied to batch, not resale theater. Cut for layering over hoodie or tee; wax patina will mark honestly with wear.",
    materials: "Martexin waxed cotton, brass snaps, cotton corduroy collar, cupro lining.",
    sizing: "Unisex. Runs slightly generous; check chest measurement against chart.",
    shippingNote: "Insured ship default. International: duties may apply.",
    care: "Cold hang. Re-wax annually or when water stops beading.",
    priceCents: 34900,
    compareAtCents: 38900,
    category: "limited",
    availability: "limited",
    featured: true,
    limitedDrop: true,
    popularity: 95,
    colors: [{ id: "field", label: "Field Brown", hex: "#5c4a3a" }],
    sizes: ["S", "M", "L", "XL"],
    imageTone: "tan",
  },
  {
    id: "pen-set",
    slug: "lightrain-signature-pen-set",
    name: "LightRain Signature Pen Set",
    tagline: "Roller and fineliner. For signatures that still mean something.",
    description:
      "Matte brass barrels, storm-gray lacquer, refillable. Ships in a pressed-paper tray—no velvet cringe.",
    longDescription:
      "Two-piece set: 0.5 mm gel roller for daily marks, 0.3 mm fineliner for margin notes on runbooks. Weighted forward like old drafting tools. Not a gimmick pen with a logo laser—this is stationery you’ll actually refill.",
    materials: "Brass, steel clip, archival black ink cartridges (ISO 12757-2).",
    sizing: "—",
    shippingNote: "Ink declared for international; may add handling time.",
    care: "Wipe barrel with dry cloth; store capped.",
    priceCents: 8900,
    category: "accessories",
    availability: "in_stock",
    featured: false,
    limitedDrop: false,
    popularity: 58,
    colors: [{ id: "default", label: "Storm Gray", hex: "#52525b" }],
    sizes: ["ONE"],
    imageTone: "slate",
  },
  {
    id: "stickers",
    slug: "lightrain-stickers-pack",
    name: "LightRain Stickers Pack",
    tagline: "Die-cut drizzle, mesh nodes, and wordmark—matte vinyl.",
    description:
      "Outdoor-safe laminate. Palette locked to charcoal, mist, and moss. Enough to mark a laptop, travel case, and field notebook without screaming.",
    longDescription:
      "Twelve-piece pack: three large format (topology abstractions), six icon marks, three micro wordmarks. Adhesive rated for curved surfaces; remove with heat if you rotate hardware often.",
    materials: "Matte PVC vinyl, UV laminate.",
    sizing: "Sheet 8.5×11\" perforated.",
    shippingNote: "Rigid mailer; ships with any order free if cart > $120 (auto).",
    care: "Apply to clean dry surface; 24h cure before outdoor exposure.",
    priceCents: 1400,
    category: "accessories",
    availability: "in_stock",
    featured: false,
    limitedDrop: false,
    popularity: 55,
    colors: [{ id: "default", label: "Mixed pack", hex: "#71717a" }],
    sizes: ["ONE"],
    imageTone: "moss",
  },
  {
    id: "notebook",
    slug: "lightrain-operator-field-notebook",
    name: "LightRain Operator Field Notebook",
    tagline: "Dot grid, lay-flat binding, rain-safe cover stock.",
    description:
      "A5, 120 gsm paper, numbered pages for audit-friendly notes. Cover: debossed drizzle pattern, no gloss.",
    longDescription:
      "We spec’d paper that takes gel and fine liner without ghosting—because field notes turn into tickets. Lay-flat binding so you can scan pages without breaking the spine. First page is a legend for your own federation shorthand.",
    materials: "FSC mix paper, PU-free cover stock, cotton thread binding.",
    sizing: "A5 (148 × 210 mm).",
    shippingNote: "Often ships with pens — bundle discount at checkout.",
    care: "Keep dry; cover wipes with damp cloth only.",
    priceCents: 2200,
    category: "accessories",
    availability: "in_stock",
    featured: false,
    limitedDrop: false,
    popularity: 60,
    colors: [
      { id: "charcoal", label: "Charcoal", hex: "#3f3f46" },
      { id: "green", label: "Moss", hex: "#3f523f" },
    ],
    sizes: ["ONE"],
    imageTone: "moss",
  },
  {
    id: "umbrella",
    slug: "lightrain-umbrella-weather-the-system",
    name: "LightRain Umbrella (Weather the System Edition)",
    tagline: "Fiberglass ribs, wind-tunnel tested, black canopy.",
    description:
      "Automatic open, manual close (we refuse spring-loaded chaos in crowds). Handle wrapped in matte rubber—grip when wet.",
    longDescription:
      "The copy writes itself, but the hardware is serious: 10mm shaft, double-vent canopy for gust stability, Teflon treatment so shake-dry actually works. Subtle wordmark under third panel—visible when you tilt, not from orbit.",
    materials: "Pongee canopy, fiberglass + aluminum frame, rubberized handle.",
    sizing: "Span 46\" / 117 cm closed length 15\".",
    shippingNote: "Oversize box; may ship alone.",
    care: "Open fully to dry before stow; lubricate joints annually if coastal.",
    priceCents: 7200,
    category: "accessories",
    availability: "in_stock",
    featured: true,
    limitedDrop: false,
    popularity: 68,
    colors: [{ id: "black", label: "Black", hex: "#18181b" }],
    sizes: ["ONE"],
    imageTone: "charcoal",
  },
  {
    id: "hw-pouch",
    slug: "lightrain-hardware-pouch",
    name: "LightRain Hardware Pouch",
    tagline: "RF-quiet lining optional. Padded for signers and cables.",
    description:
      "Ballistic nylon shell, YKK zip, internal mesh and elastic loops. Sized for a compact signer + cables + SD workflow.",
    longDescription:
      "Pick standard padded layout or RF-quiet variant (silver mesh layer) for travel through aggressive spaces. Not a Faraday cage—just prudent attenuation for idle devices.",
    materials: "1050D nylon, EVA padding, optional Cu-Ni mesh layer (RF variant).",
    sizing: "195 × 120 × 55 mm internal usable.",
    shippingNote: "RF variant flagged for customs transparency in EU/UK.",
    care: "Wipe exterior; air interior after humid trips.",
    priceCents: 5400,
    category: "accessories",
    availability: "in_stock",
    featured: false,
    limitedDrop: false,
    popularity: 64,
    colors: [
      { id: "black", label: "Black", hex: "#27272a" },
      { id: "rf", label: "RF-quiet", hex: "#3f3f46" },
    ],
    sizes: ["ONE"],
    imageTone: "slate",
  },
  {
    id: "cold-wallet",
    slug: "lightrain-cold-wallet-air-gapped",
    name: "LightRain Cold Wallet (Air-Gapped Edition)",
    tagline: "PSBT-first workflow. No live radio. Operator ceremony.",
    description:
      "Companion signer profile: MicroSD in/out, OLED status, sealed bootloader policy. You bring the seed discipline—we ship the shell.",
    longDescription:
      "This is not a custodial shortcut. Device ships blank; firmware verification steps are printed on a single card you’re meant to destroy after first setup. Designed for PSBT shuffle between online watch-only and offline sign. Language is sober because the stakes are.",
    materials: "Aluminum frame, hardened glass, USB-C for power-only updates (user-gated).",
    sizing: "Device 62 × 34 × 8 mm.",
    shippingNote: "Adult signature default. Serialized for support cross-check only.",
    care: "Store dry; avoid solvents on screen; firmware only from published manifest.",
    priceCents: 14900,
    compareAtCents: 16900,
    category: "tech",
    availability: "limited",
    featured: true,
    limitedDrop: true,
    popularity: 92,
    colors: [{ id: "graphite", label: "Graphite", hex: "#3d3d42" }],
    sizes: ["ONE"],
    imageTone: "charcoal",
  },
  {
    id: "usbc-cable",
    slug: "lightrain-usbc-cable-braided-storm",
    name: "LightRain USB-C Cable (Braided Storm Edition)",
    tagline: "2 m, 100W e-marked, braid that does not fray in six months.",
    description:
      "Silicone-over-braid jacket for cold-weather flex. Gunmetal shells, strain relief you can see.",
    longDescription:
      "We burned through samples until we found a braid that survives bag friction and server-room chair wheels. E-marker for honest PD negotiation. If you’re still using gas-station cables on signing laptops, stop.",
    materials: "TPE over copper braid, aluminum housings, E-marker IC.",
    sizing: "2.0 m length.",
    shippingNote: "Small parcel.",
    care: "Coil loose; avoid acute bends at housing junctions.",
    priceCents: 3400,
    category: "tech",
    availability: "in_stock",
    featured: false,
    limitedDrop: false,
    popularity: 72,
    colors: [{ id: "storm", label: "Storm Gray", hex: "#52525b" }],
    sizes: ["ONE"],
    imageTone: "storm",
  },
  {
    id: "charger",
    slug: "lightrain-wireless-charger-pad",
    name: "LightRain Wireless Charger Pad",
    tagline: "15 W Qi, weighted base, mist-ring status LED.",
    description:
      "Aluminum disc, cork base ring for grip. LED breathes during charge—off when full so your night desk stays dark.",
    longDescription:
      "Thermal pad under coil so phones do not throttle mid-night. Works through most non-metallic cases under 3 mm. We tuned the LED color temperature to match our UI grays—petty, but you’ll notice.",
    materials: "Aluminum, cork, silicone foot ring, Qi coil + chipset.",
    sizing: "Diameter 98 mm, height 11 mm.",
    shippingNote: "Includes 30W USB-C PSU in US/JP; EU plug variant ships with adapter.",
    care: "Unplug to clean; wipe with dry cloth.",
    priceCents: 5900,
    category: "tech",
    availability: "in_stock",
    featured: false,
    limitedDrop: false,
    popularity: 66,
    colors: [
      { id: "silver", label: "Silver Mist", hex: "#a1a1aa" },
      { id: "black", label: "Black", hex: "#27272a" },
    ],
    sizes: ["ONE"],
    imageTone: "mist",
  },
  {
    id: "desk-mat",
    slug: "lightrain-desk-mat-operator-grid",
    name: "LightRain Desk Mat (Operator Grid)",
    tagline: "900 × 400 mm. Subtle grid, stitched edge, low-friction weave.",
    description:
      "Mouse and keyboard share one surface. Grid is 5 mm—enough for alignment, not spreadsheet cosplay.",
    longDescription:
      "Rubber base, textile top with anti-fray stitch. Grid prints in two-tone gray visible under task light, quiet on camera. Ships rolled; lays flat in ~24h at room temp.",
    materials: "Natural rubber, polyester surface, nylon stitch.",
    sizing: "900 × 400 × 3 mm.",
    shippingNote: "Tube ship; may arrive separate from apparel in split carts.",
    care: "Vacuum lint; spot clean with mild soap.",
    priceCents: 6800,
    category: "tech",
    availability: "in_stock",
    featured: false,
    limitedDrop: false,
    popularity: 74,
    colors: [{ id: "grid", label: "Grid / Charcoal", hex: "#3f3f46" }],
    sizes: ["ONE"],
    imageTone: "charcoal",
  },
  {
    id: "toolkit",
    slug: "lightrain-operator-toolkit",
    name: "LightRain Operator Toolkit",
    tagline: "Precision drivers, spudgers, torque-safe bits for hardware ops.",
    description:
      "Hardened S2 bits, swivel top driver, ESD-safe tweezers. Case: ABS, foam cut for flight.",
    longDescription:
      "If your ‘operator stack’ includes swapping SSDs or tightening rack ears, this is the box. We skipped gimmick tools you’ll never touch. Bit codes etched—not printed.",
    materials: "S2 steel bits, glass-filled nylon handle, ESD tweezers, ABS case.",
    sizing: "Case 210 × 140 × 45 mm.",
    shippingNote: "Tools may require age verification in some locales.",
    care: "Dry bits after humid environments; oil hinges yearly.",
    priceCents: 11200,
    category: "hardware",
    availability: "in_stock",
    featured: true,
    limitedDrop: false,
    popularity: 80,
    colors: [{ id: "default", label: "Black case", hex: "#27272a" }],
    sizes: ["ONE"],
    imageTone: "charcoal",
  },
  {
    id: "multitool",
    slug: "lightrain-multi-tool",
    name: "LightRain Multi-Tool",
    tagline: "Pliers-first, one-hand deploy, blackout oxide.",
    description:
      "Stainless frame, 18 functions including hex for rack screws and a decent wire stripper—not afterthought teeth.",
    longDescription:
      "We picked a pliers-first chassis because knife-primary multitools lie about what you actually use in the field. Black oxide for glare reduction under DC lights.",
    materials: "420 stainless, black oxide finish.",
    sizing: "Closed length 102 mm.",
    shippingNote: "Check local carry laws; blade locks where prohibited ship without blade module.",
    care: "Oil pivots; keep grit out of scales.",
    priceCents: 9600,
    category: "hardware",
    availability: "in_stock",
    featured: false,
    limitedDrop: false,
    popularity: 71,
    colors: [{ id: "black", label: "Blackout", hex: "#18181b" }],
    sizes: ["ONE"],
    imageTone: "slate",
  },
  {
    id: "keychain",
    slug: "lightrain-keychain-tag-steel",
    name: "LightRain Keychain Tag (Steel Edition)",
    tagline: "Laser-marked serial plane. No QR hype—just mass and edge.",
    description:
      "303 stainless, chamfered edges, split ring rated 15 kg. Marking: drizzle line + micro text.",
    longDescription:
      "Enough heft that you feel it in pocket—anchor for keys or a signer lanyard. Laser dark-marking survives years of abrasion.",
    materials: "303 stainless steel, stainless split ring.",
    sizing: "Tag 48 × 28 × 2.5 mm.",
    shippingNote: "Letter mail eligible domestically when solo in cart.",
    care: "Brass brush if you like patina control.",
    priceCents: 2800,
    category: "hardware",
    availability: "in_stock",
    featured: false,
    limitedDrop: false,
    popularity: 57,
    colors: [{ id: "steel", label: "Raw Steel", hex: "#a8a29e" }],
    sizes: ["ONE"],
    imageTone: "mist",
  },
];

export function getProductBySlug(slug: string): ShopProduct | undefined {
  return SHOP_PRODUCTS.find((p) => p.slug === slug);
}

export function formatShopPrice(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
