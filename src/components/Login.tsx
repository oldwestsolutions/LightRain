import { useState } from "react";
import { Loader2, Lock, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { WalletConnectModal } from "./WalletConnectModal";

export function Login() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("demo@lightra.in");
  const [password, setPassword] = useState("demo123");
  const [walletOpen, setWalletOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-black px-4 py-16">
        {loading && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            aria-busy="true"
            aria-label="Signing in"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-mint" />
              <p className="text-sm text-muted">Signing in…</p>
            </div>
          </div>
        )}

        <div className="relative z-[1] w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-8 shadow-[0_0_80px_rgba(0,255,170,0.06)] transition-transform duration-500 hover:border-white/15">
          <header className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
              <span className="border-b-2 border-mint/50 pb-0.5">LightRa.in</span>
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              Compliant Crypto Payments for High-Risk Merchants
            </p>
          </header>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-black py-3 pl-10 pr-3 text-sm text-white outline-none transition-colors focus:border-mint/45"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-black py-3 pl-10 pr-3 text-sm text-white outline-none transition-colors focus:border-mint/45"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setWalletOpen(true)}
              className="w-full rounded-lg border border-white/20 bg-white/[0.04] py-3 text-sm font-medium text-white transition-all duration-300 hover:border-mint/35 hover:bg-mint/5"
            >
              Connect with Wallet
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg border border-mint/50 bg-mint/15 py-3.5 text-sm font-semibold tracking-wide text-mint transition-all duration-300 hover:bg-mint/25 hover:shadow-mint disabled:opacity-50"
            >
              Login
            </button>
          </form>
        </div>

        <p className="mt-10 max-w-sm text-center text-xs text-muted/80">
          Demo only. No real authentication or blockchain transactions.
        </p>
      </div>

      <WalletConnectModal open={walletOpen} onClose={() => setWalletOpen(false)} />
    </>
  );
}
