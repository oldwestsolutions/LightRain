"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MarketplacePage } from "@/views/MarketplacePage";
import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;
  return <MarketplacePage />;
}
