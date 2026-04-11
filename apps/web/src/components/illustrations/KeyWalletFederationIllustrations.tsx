/** Custom line illustrations for Key / Wallet / Federation (not emoji, not Lucide glyphs). */

export function KeyIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="10" y="10" width="60" height="60" rx="14" fill="#f5f5f5" stroke="#e5e5e5" strokeWidth="1.25" />
      <path
        d="M34 30c0-5 4-9 9-9s9 4 9 9v5h-5v-5c0-2.2-1.8-4-4-4s-4 1.8-4 4v11h-5V30z"
        fill="#262626"
      />
      <rect x="37" y="46" width="18" height="14" rx="3" fill="#404040" />
      <circle cx="46" cy="53" r="2" fill="#fafafa" />
    </svg>
  );
}

export function WalletIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="10" y="10" width="60" height="60" rx="14" fill="#f5f5f5" stroke="#e5e5e5" strokeWidth="1.25" />
      <path
        d="M24 36h32c4 0 7 3 7 7v12c0 4-3 7-7 7H24c-2 0-4-1.5-4-3.5V39.5c0-2 2-3.5 4-3.5z"
        stroke="#262626"
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="#fafafa"
      />
      <path d="M24 36v-4c0-3 2.5-5 5.5-5h18" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="48" y="44" width="12" height="9" rx="2" stroke="#525252" strokeWidth="1.8" fill="none" />
    </svg>
  );
}

export function FederationIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="10" y="10" width="60" height="60" rx="14" fill="#f5f5f5" stroke="#e5e5e5" strokeWidth="1.25" />
      <path d="M26 26h36v40H26V26z" stroke="#262626" strokeWidth="2" strokeLinejoin="round" fill="#fafafa" />
      <path d="M30 34h28M30 42h20M30 50h24" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 22l8 8-8 8" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M58 30H46c-2 0-3.5-1.5-3.5-3V18" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
