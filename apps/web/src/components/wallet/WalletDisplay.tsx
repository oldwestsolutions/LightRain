"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  walletName: string;
  onClick?: () => void;
  variant?: "default" | "screensaver";
  className?: string;
};

function WalletArt({
  walletName,
  reduceMotion,
  flapRepeats,
}: {
  walletName: string;
  reduceMotion: boolean | null;
  flapRepeats: boolean;
}) {
  return (
    <>
      <span className="pointer-events-none absolute -inset-6 rounded-[40%] bg-gradient-to-br from-amber-950/25 via-transparent to-stone-900/20 blur-2xl" />

      <div
        className="relative h-[min(52vw,220px)] w-[min(72vw,300px)] max-w-[300px] transition-transform duration-500 ease-out group-hover:[transform:rotateX(6deg)_rotateY(-8deg)]"
        style={{ perspective: "900px", transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-[46%_46%_42%_42%] shadow-[0_28px_60px_-12px_rgba(28,22,18,0.55),0_12px_24px_-14px_rgba(0,0,0,0.35),inset_0_-18px_32px_rgba(0,0,0,0.22),inset_0_10px_24px_rgba(255,255,255,0.12)]"
          style={{
            background: `
                radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.14) 0%, transparent 42%),
                radial-gradient(90% 70% at 20% 30%, rgba(139,90,43,0.35) 0%, transparent 50%),
                radial-gradient(80% 60% at 78% 65%, rgba(62,39,18,0.55) 0%, transparent 55%),
                linear-gradient(165deg, #5c3d2e 0%, #3d2718 38%, #2a1a12 72%, #1f140e 100%)
              `,
          }}
        />

        <div
          className="absolute inset-0 rounded-[46%_46%_42%_42%] opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.65'/%3E%3C/svg%3E")`,
          }}
        />

        <motion.div
          className="absolute left-[8%] right-[8%] top-[6%] h-[38%] origin-top rounded-[50%] border border-black/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(80,52,36,0.45) 18%, rgba(42,28,18,0.92) 100%)",
          }}
          animate={reduceMotion ? undefined : { rotateX: flapRepeats ? [0, -6, 0] : 0 }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 4.5, repeat: flapRepeats ? Infinity : 0, ease: "easeInOut" }
          }
        />

        <div
          className="pointer-events-none absolute inset-[10%] rounded-[44%] border border-dashed border-white/10 opacity-70"
          aria-hidden
        />

        <div className="pointer-events-none absolute bottom-[18%] left-1/2 h-9 w-9 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-200/90 via-amber-500/80 to-amber-800/90 shadow-[0_4px_12px_rgba(0,0,0,0.35),inset_0_2px_3px_rgba(255,255,255,0.45)] ring-1 ring-black/20" />

        <div className="absolute bottom-[14%] left-1/2 w-[78%] -translate-x-1/2 rounded-full border border-black/25 bg-black/25 px-4 py-2 text-center shadow-inner backdrop-blur-[2px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-100/80">Wallet</p>
          <p className="mt-0.5 truncate font-display text-base font-normal tracking-[0.08em] text-white">
            {walletName}
          </p>
        </div>
      </div>
    </>
  );
}

export function WalletDisplay({ walletName, onClick, variant = "default", className = "" }: Props) {
  const reduceMotion = useReducedMotion();
  const interactive = Boolean(onClick);
  const isSaver = variant === "screensaver";

  const floatLoop = reduceMotion
    ? {}
    : isSaver
      ? {
          y: [0, -10, 0],
          rotateZ: [-1.2, 1.2, -1.2],
        }
      : {};

  const floatTransition = reduceMotion
    ? { duration: 0.01 }
    : isSaver
      ? { duration: 7, repeat: Infinity, ease: "easeInOut" as const }
      : {};

  const outerClass = `group relative outline-none ${interactive ? "cursor-pointer" : "cursor-default"}`;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {interactive ? (
        <motion.button
          type="button"
          onClick={onClick}
          animate={floatLoop}
          transition={floatTransition}
          whileHover={reduceMotion || isSaver ? undefined : { scale: 1.02, rotateX: 4, rotateY: -3 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          className={outerClass}
          aria-label={`Open wallet, ${walletName}`}
        >
          <WalletArt walletName={walletName} reduceMotion={reduceMotion} flapRepeats={!isSaver} />
        </motion.button>
      ) : (
        <motion.div
          animate={floatLoop}
          transition={floatTransition}
          className={outerClass}
          aria-label={`Idle wallet, ${walletName}`}
        >
          <WalletArt walletName={walletName} reduceMotion={reduceMotion} flapRepeats={false} />
        </motion.div>
      )}

      {interactive ? (
        <p className="mt-8 max-w-xs text-center text-sm text-neutral-500">Tap to open search &amp; discovery</p>
      ) : null}
    </div>
  );
}
