"use client";

import { CreateAccountPage } from "@/views/CreateAccountPage";
import { RedirectToWallet } from "@/components/RedirectToWallet";
import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  if (isLoggedIn) return <RedirectToWallet />;
  return <CreateAccountPage />;
}
