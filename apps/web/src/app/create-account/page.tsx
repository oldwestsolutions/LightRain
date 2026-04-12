"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CreateAccountPage } from "@/views/CreateAccountPage";
import { RainBackground } from "@/components/RainBackground";
import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return;
    router.replace("/wallet");
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return (
      <div className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center bg-canvas safe-pt">
        <RainBackground />
        <div
          className="pointer-events-none fixed inset-0 z-[2] bg-gradient-to-b from-canvas/88 via-canvas/45 to-canvas/82"
          aria-hidden
        />
        <div className="relative z-10 flex flex-col items-center gap-3 px-4">
          <Loader2 className="h-10 w-10 animate-spin text-accent" aria-hidden />
          <p className="text-sm text-muted">Opening your wallet…</p>
        </div>
      </div>
    );
  }

  return <CreateAccountPage />;
}
