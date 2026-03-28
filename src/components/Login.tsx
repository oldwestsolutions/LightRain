import { useState } from "react";
import { Loader2, Lock, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { LoginFooter } from "./LoginFooter";
import { RainBackground } from "./RainBackground";

const GUEST_EMAIL = "guest@lightrain.in";

export function Login() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const runLogin = async () => {
    setLoading(true);
    try {
      await login(email.trim() || GUEST_EMAIL, password);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await runLogin();
  };

  const handleLoginClick = () => {
    void runLogin();
  };

  const inputClass =
    "min-h-[48px] w-full rounded-xl border border-neutral-200/90 bg-white py-3 pl-10 pr-3 text-base text-neutral-900 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/10 sm:text-sm";

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 backdrop-blur-sm transition-opacity duration-300"
            aria-busy="true"
            aria-label="Signing in"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-accent" />
              <p className="text-sm text-muted">Signing in…</p>
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-1 flex-col items-center justify-start px-4 pb-6 pt-[6vh] sm:px-6 sm:pb-10 sm:pt-[10vh] md:pt-[12vh]">
          <div className="flex w-full max-w-md flex-col items-center">
            <div className="relative z-[1] w-full rounded-2xl border border-neutral-200/90 bg-white/92 p-5 shadow-card backdrop-blur-md transition-shadow duration-500 sm:rounded-3xl sm:p-8 sm:hover:shadow-soft">
              <header className="mb-6 text-center sm:mb-8">
                <h1 className="font-display text-[1.85rem] font-normal leading-tight tracking-[0.12em] text-neutral-900 sm:text-4xl sm:tracking-[0.14em]">
                  Light<span className="text-accent">Rain</span>
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                  Private Discretionary Blockchain Ledger
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted sm:left-3.5" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted sm:left-3.5" />
                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLoginClick}
                  disabled={loading}
                  className="min-h-[48px] w-full touch-manipulation rounded-xl border border-neutral-200 bg-white/95 py-3 text-base font-semibold text-neutral-800 transition-all duration-300 hover:border-neutral-300 hover:bg-white active:bg-neutral-50 disabled:opacity-50 sm:text-sm"
                >
                  Login
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="min-h-[48px] w-full touch-manipulation rounded-xl bg-accent py-3.5 text-base font-semibold tracking-wide text-white shadow-soft transition-all duration-300 hover:bg-neutral-800 active:bg-neutral-900 disabled:opacity-50 sm:text-sm"
                >
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
