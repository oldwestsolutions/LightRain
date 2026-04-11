/**
 * Schematic-style illustrations aligned with company workflow stage art:
 * framed operator-surface panels, mono labels, inner chrome — with restrained accent color.
 */

const sans = "ui-sans-serif, system-ui, sans-serif";
const mono = "ui-monospace, monospace";

type Props = { className?: string };

export function KeyIllustration({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="kwf-key-frame" x1="8" y1="8" x2="112" y2="112" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fafafa" />
          <stop offset="1" stopColor="#f4f4f5" />
        </linearGradient>
        <linearGradient id="kwf-key-accent" x1="62" y1="44" x2="98" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fcd34d" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="14" fill="url(#kwf-key-frame)" stroke="#e5e5e5" strokeWidth="1" />
      <rect x="10" y="10" width="100" height="100" rx="10" fill="#fff" stroke="#d4d4d4" strokeWidth="1.15" />
      <text x="18" y="26" fill="#737373" fontSize="7" fontFamily={sans} letterSpacing="0.12em">
        KEY MATERIAL
      </text>
      <rect x="18" y="32" width="44" height="10" rx="2" fill="#fffbeb" stroke="#fcd34d" strokeWidth="0.9" />
      <text x="22" y="39" fill="#b45309" fontSize="5.5" fontFamily={mono}>
        HW · OFFLINE
      </text>
      <rect x="18" y="48" width="84" height="52" rx="6" fill="#fafafa" stroke="#e5e5e5" strokeWidth="1" />
      <path
        d="M28 58h32v28H28V58z"
        fill="#fff7ed"
        stroke="#fdba74"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M34 64h20M34 70h16M34 76h20" stroke="#9ca3af" strokeWidth="1" strokeLinecap="round" />
      <circle cx="74" cy="68" r="10" fill="url(#kwf-key-accent)" stroke="#d97706" strokeWidth="0.8" />
      <rect x="68" y="82" width="28" height="14" rx="3" fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.9" />
      <path d="M74 86h16M74 90h12" stroke="#b45309" strokeWidth="1" strokeLinecap="round" />
      <rect x="86" y="56" width="12" height="8" rx="1.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.75" />
      <text x="92" y="62" textAnchor="middle" fill="#0369a1" fontSize="4.5" fontFamily={mono}>
        2FA
      </text>
    </svg>
  );
}

export function WalletIllustration({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="kwf-wallet-frame" x1="8" y1="8" x2="112" y2="112" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fafafa" />
          <stop offset="1" stopColor="#f4f4f5" />
        </linearGradient>
        <linearGradient id="kwf-wallet-chip" x1="78" y1="62" x2="96" y2="82" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5eead4" />
          <stop offset="1" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="14" fill="url(#kwf-wallet-frame)" stroke="#e5e5e5" strokeWidth="1" />
      <rect x="10" y="10" width="100" height="100" rx="10" fill="#fff" stroke="#d4d4d4" strokeWidth="1.15" />
      <text x="18" y="26" fill="#737373" fontSize="7" fontFamily={sans} letterSpacing="0.12em">
        WALLET SURFACE
      </text>
      <rect x="18" y="32" width="84" height="68" rx="8" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1" />
      <path
        d="M26 48h68c3 0 5 2 5 5v28c0 3-2 5-5 5H26c-2 0-4-1.5-4-3.5V51.5c0-2 2-3.5 4-3.5z"
        fill="#fff"
        stroke="#0d9488"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M26 48v-5c0-2.5 2-4.5 4.5-4.5h28" stroke="#0f766e" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M32 58h52M32 66h40M32 74h48" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
      <rect x="72" y="58" width="18" height="14" rx="2.5" fill="url(#kwf-wallet-chip)" stroke="#0f766e" strokeWidth="0.85" />
      <path d="M78 64h8M78 68h6" stroke="#ecfdf5" strokeWidth="1" strokeLinecap="round" opacity="0.95" />
      <rect x="24" y="86" width="36" height="14" rx="3" fill="#ccfbf1" stroke="#2dd4bf" strokeWidth="0.85" />
      <text x="42" y="96" textAnchor="middle" fill="#115e59" fontSize="6" fontFamily={mono}>
        CONF
      </text>
      <circle cx="92" cy="93" r="5" fill="#d1fae5" stroke="#34d399" strokeWidth="0.9" />
      <path d="M90 93l2 2 4-5" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="60" y="112" textAnchor="middle" fill="#525252" fontSize="8" fontFamily={sans} fontWeight="600">
        Activity you can read
      </text>
    </svg>
  );
}

export function FederationIllustration({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="kwf-fed-frame" x1="8" y1="8" x2="112" y2="112" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fafafa" />
          <stop offset="1" stopColor="#f4f4f5" />
        </linearGradient>
        <linearGradient id="kwf-fed-node" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#93c5fd" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="14" fill="url(#kwf-fed-frame)" stroke="#e5e5e5" strokeWidth="1" />
      <rect x="10" y="10" width="100" height="100" rx="10" fill="#fff" stroke="#d4d4d4" strokeWidth="1.15" />
      <text x="18" y="26" fill="#737373" fontSize="7" fontFamily={sans} letterSpacing="0.12em">
        FEDERATION ROUTE
      </text>
      <rect x="18" y="32" width="84" height="22" rx="4" fill="#eff6ff" stroke="#93c5fd" strokeWidth="0.9" />
      <text x="24" y="46" fill="#1e40af" fontSize="7.5" fontFamily={mono}>
        <tspan>vault</tspan>
        <tspan fill="#64748b">*</tspan>
        <tspan fill="#1d4ed8">lightrain</tspan>
      </text>
      <rect x="18" y="60" width="52" height="40" rx="4" fill="#fafafa" stroke="#e5e5e5" strokeWidth="1" />
      <path d="M26 72h36M26 80h28M26 88h32" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
      <text x="26" y="70" fill="#9ca3af" fontSize="5.5" fontFamily={sans}>
        Published table
      </text>
      <circle cx="88" cy="70" r="7" fill="url(#kwf-fed-node)" stroke="#1d4ed8" strokeWidth="0.75" />
      <circle cx="102" cy="88" r="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="0.75" />
      <circle cx="76" cy="92" r="5" fill="#f1f5f9" stroke="#64748b" strokeWidth="0.75" />
      <path d="M76 92l10-20M88 70l10 16" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" />
      <path d="M88 70l-12 22" stroke="#94a3b8" strokeWidth="0.9" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M24 104h64" stroke="#bfdbfe" strokeWidth="2" strokeLinecap="round" />
      <polygon points="88,100 96,104 88,108" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="0.4" />
    </svg>
  );
}
