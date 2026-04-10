"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AccountProfilePage } from "@/views/AccountProfilePage";
import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;
  return <AccountProfilePage />;
}
