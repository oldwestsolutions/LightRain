"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthenticatedLayout } from "@/components/AuthenticatedLayout";
import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;
  return <AuthenticatedLayout />;
}
