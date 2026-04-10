/**
 * Decorative hero art — SVG so it stays sharp and needs no external fetch.
 */
export function CompanyHeroImage() {
  return (
    <div className="relative h-full min-h-[220px] w-full overflow-hidden bg-[#E8EAEE] lg:min-h-full lg:min-h-0">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <svg
        className="relative z-[1] h-full w-full object-cover"
        viewBox="0 0 560 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Abstract illustration of settlement rails and network connections"
      >
        <defs>
          <linearGradient id="ch-a" x1="80" y1="60" x2="480" y2="560" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F3F4F6" />
            <stop offset="0.45" stopColor="#E5E7EB" />
            <stop offset="1" stopColor="#D1D5DB" />
          </linearGradient>
          <linearGradient id="ch-b" x1="320" y1="120" x2="520" y2="420" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3D3D3D" stopOpacity="0.12" />
            <stop offset="1" stopColor="#3D3D3D" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <rect width="560" height="640" fill="url(#ch-a)" />
        <circle cx="420" cy="140" r="120" fill="url(#ch-b)" opacity="0.9" />
        <circle cx="120" cy="480" r="90" fill="url(#ch-b)" opacity="0.55" />

        {/* Network graph */}
        <g stroke="#3D3D3D" strokeOpacity="0.2" strokeWidth="1.5">
          <path d="M120 200 L260 280 L400 200" />
          <path d="M120 200 L180 380" />
          <path d="M400 200 L340 380" />
          <path d="M260 280 L260 420" />
          <path d="M180 380 L340 380 L260 520" />
        </g>
        <g fill="#3D3D3D">
          <circle cx="120" cy="200" r="8" opacity="0.85" />
          <circle cx="400" cy="200" r="8" opacity="0.85" />
          <circle cx="260" cy="280" r="10" opacity="0.95" />
          <circle cx="180" cy="380" r="7" opacity="0.75" />
          <circle cx="340" cy="380" r="7" opacity="0.75" />
          <circle cx="260" cy="420" r="6" opacity="0.6" />
          <circle cx="260" cy="520" r="8" opacity="0.8" />
        </g>

        {/* Ledger / stack */}
        <g opacity="0.98">
          <rect x="88" y="96" width="200" height="128" rx="12" fill="white" stroke="#D1D5DB" strokeWidth="1" />
          <rect x="104" y="116" width="168" height="10" rx="3" fill="#E5E7EB" />
          <rect x="104" y="136" width="120" height="8" rx="2" fill="#F3F4F6" />
          <rect x="104" y="152" width="148" height="8" rx="2" fill="#F3F4F6" />
          <rect x="104" y="176" width="88" height="28" rx="6" fill="#3D3D3D" opacity="0.9" />
        </g>

        <g>
          <rect x="300" y="360" width="200" height="140" rx="14" fill="white" stroke="#D1D5DB" strokeWidth="1" />
          <path
            d="M330 420 L370 450 L430 390"
            stroke="#3D3D3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.45"
          />
          <circle cx="370" cy="410" r="6" fill="#3D3D3D" opacity="0.5" />
          <circle cx="430" cy="410" r="6" fill="#3D3D3D" opacity="0.35" />
          <circle cx="400" cy="450" r="6" fill="#3D3D3D" opacity="0.65" />
        </g>

        <text
          x="48"
          y="600"
          fill="#9CA3AF"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="11"
          letterSpacing="0.08em"
        >
          ILLUSTRATIVE · SETTLEMENT LAYER
        </text>
      </svg>
    </div>
  );
}
