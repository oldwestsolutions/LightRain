"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreateAccountPage } from "@/views/CreateAccountPage";
import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) router.replace("/dashboard");
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;
  return <CreateAccountPage />;
}
