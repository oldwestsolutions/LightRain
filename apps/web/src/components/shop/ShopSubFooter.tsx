"use client";

/**
 * In-page legal line for the shop (shell already renders LoginFooter links below).
 * Matches LoginFooter copyright scale with explicit LightRain™.
 */
export function ShopSubFooter() {
  return (
    <footer className="mt-10 border-t border-neutral-200/80 pt-6 text-center">
      <p className="text-[11px] leading-snug text-muted/90">
        <span className="font-medium text-neutral-800">LightRain</span>
        <span className="align-super text-[8px]">™</span>
        <span className="mx-1.5 select-none text-neutral-300" aria-hidden>
          ·
        </span>
        © 2026 Hated By Many LLC. All Rights Reserved
      </p>
    </footer>
  );
}
