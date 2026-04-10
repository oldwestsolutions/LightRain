"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { LoginFooter } from "../components/LoginFooter";
import { RainBackground } from "../components/RainBackground";
import { SAMPLE_EMAIL_PLACEHOLDER } from "../components/Login";

const GUEST_EMAIL = "guest@lightra.in";

export function CreateAccountPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email.trim() || GUEST_EMAIL, password);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "min-h-[48px] w-full rounded-xl border border-neutral-200/90 bg-white py-3 pl-10 pr-3 text-base text-neutral-900 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/10 sm:text-sm";

  const primaryBtnClass =
    "flex min-h-[48px] w-full items-center justify-center rounded-xl border border-neutral-600 bg-neutral-700 px-4 py-3.5 text-base font-semibold leading-none text-white shadow-sm transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-800 active:bg-neutral-900 disabled:opacity-50 sm:min-h-[48px] sm:py-3.5 sm:text-sm";

  return (
    <>
      <div className="relative flex min-h-screen min-h-[100dvh] flex-col bg-canvas safe-pt">
        <RainBackground />
        <div
          className="pointer-events-none fixed inset-0 z-[2] bg-gradient-to-b from-canvas/88 via-canvas/45 to-canvas/82"
          aria-hidden
        />

        {loading && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 backdrop-blur-sm"
            aria-busy="true"
            aria-label="Creating account"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-accent" />
              <p className="text-sm text-muted">Creating your account…</p>
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-1 flex-col items-center justify-start px-4 pb-6 pt-[6vh] sm:px-6 sm:pb-10 sm:pt-[10vh] md:pt-[12vh]">
          <div className="flex w-full max-w-md flex-col items-center">
            <div className="relative z-[1] w-full rounded-2xl border border-neutral-200/90 bg-white/92 p-5 shadow-card backdrop-blur-md sm:rounded-3xl sm:p-8">
              <p className="mb-4 text-center">
                <Link href="/" className="text-sm font-medium text-muted hover:text-accent">
                  ← Back to sign in
                </Link>
              </p>
              <header className="mb-6 text-center sm:mb-8">
                <h1 className="font-display text-[1.65rem] font-normal leading-tight tracking-[0.1em] text-neutral-900 sm:text-3xl">
                  Create your account
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                  Join LightRain to get a federation settlement address and access the merchant network. Choose an
                  email and password you will use to sign in later (demo: any values work).
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="signup-email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted sm:left-3.5" />
                    <input
                      id="signup-email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder={SAMPLE_EMAIL_PLACEHOLDER}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="signup-password" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted sm:left-3.5" />
                    <input
                      id="signup-password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className={`${primaryBtnClass} touch-manipulation`}>
                  Create account
                </button>
              </form>
            </div>
            <div className="safe-pb w-full">
              <LoginFooter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
