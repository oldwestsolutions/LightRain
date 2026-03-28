import { useState } from "react";
import { Loader2, Lock, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { LoginFooter } from "./LoginFooter";
import { WalletConnectModal } from "./WalletConnectModal";

export function Login() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("demo@lightrain.in");
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
      <div className="relative flex min-h-screen flex-col bg-canvas">
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

        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
          <div className="flex w-full max-w-md flex-col items-center">
            <div className="relative z-[1] w-full rounded-3xl border border-neutral-200/80 bg-surface p-8 shadow-card transition-shadow duration-500 hover:shadow-soft">
            <header className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-neutral-900">
                Light<span className="text-accent">Rain</span>
              </h1>
              <p className="text-sm leading-relaxed text-muted">
                Private Discretionary Blockchain Ledger
              </p>
            </header>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
                >
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
                    className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-10 pr-3 text-sm text-neutral-900 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/10"
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
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-10 pr-3 text-sm text-neutral-900 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/10"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setWalletOpen(true)}
                className="w-full rounded-xl border border-neutral-200 bg-white py-3 text-sm font-medium text-neutral-800 transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50"
              >
                Connect with Wallet
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-accent py-3.5 text-sm font-semibold tracking-wide text-white shadow-soft transition-all duration-300 hover:bg-neutral-800 disabled:opacity-50"
              >
                Create account
              </button>
            </form>
            </div>
            <LoginFooter />
          </div>
        </div>
      </div>

      <WalletConnectModal open={walletOpen} onClose={() => setWalletOpen(false)} />
    </>
  );
}
