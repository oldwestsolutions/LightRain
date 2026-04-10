"use client";

import { Login } from "@/components/Login";
import { RedirectToWallet } from "@/components/RedirectToWallet";
import { useAuthStore } from "@/store/useAuthStore";

export default function HomePage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  if (isLoggedIn) return <RedirectToWallet />;
  return <Login />;
}
