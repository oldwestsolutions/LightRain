"use client";

import { useRouter } from "next/navigation";
import { RainBackground } from "@/components/RainBackground";
import { WalletDisplay } from "@/components/wallet/WalletDisplay";
import { useAuthStore } from "@/store/useAuthStore";
import { useWalletUiStore } from "@/store/useWalletUiStore";

function walletLabel(userName: string | undefined, custom: string) {
  const c = custom.trim();
  if (c) return c;
  const n = userName?.trim();
  if (n) return n;
  return "My Wallet";
}

export default function WalletLandingPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const customName = useWalletUiStore((s) => s.walletDisplayName);

  return (
    <main className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-16">
      <RainBackground />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-canvas/90 via-canvas/50 to-canvas/88"
        aria-hidden
      />

      <div className="relative z-[2] flex flex-col items-center">
        <WalletDisplay
          walletName={walletLabel(user?.name, customName)}
          onClick={() => router.push("/wallet/hub")}
        />
      </div>
    </main>
  );
}
