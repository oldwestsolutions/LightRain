"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Dashboard } from "@/components/Dashboard";
import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) return;
    router.replace("/");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen min-h-[100dvh] flex-col items-center justify-center bg-canvas px-4">
        <Loader2 className="h-10 w-10 animate-spin text-accent" aria-hidden />
        <p className="mt-4 text-sm text-muted">Returning to sign in…</p>
      </div>
    );
  }

  return <Dashboard />;
}
