import { useMemo, useState } from "react";
import { Copy, Send } from "lucide-react";
import { MERCHANTS, type Merchant } from "../data/merchants";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";
import { MerchantCard } from "./MerchantCard";
import { Modal } from "./Modal";
import { Navbar } from "./Navbar";
import { SendPaymentModal } from "./SendPaymentModal";

const WALLET = "dispensary01*lightra.in";

export function Dashboard() {
  const user = useAuthStore((s) => s.user)!;
  const logout = useAuthStore((s) => s.logout);
  const showToast = useToastStore((s) => s.show);

  const [searchQuery, setSearchQuery] = useState("");
  const [profileMerchant, setProfileMerchant] = useState<Merchant | null>(null);
  const [sendOpen, setSendOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MERCHANTS;
    return MERCHANTS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.federationAddress.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(WALLET);
      showToast("Address copied!");
    } catch {
      showToast("Copied (mock)");
    }
  };

  return (
    <div className="relative min-h-screen bg-black scanlines">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-grid-faint bg-[length:32px_32px] opacity-[0.35]"
        aria-hidden
      />

      <Navbar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogout={logout}
      />

      <main className="relative z-[2] mx-auto max-w-7xl px-4 pb-20 pt-24 lg:px-8 lg:pt-28">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Welcome back, {user.name}
            </h1>
            <p className="mt-1 text-sm text-muted">Settlement dashboard · Stellar federation</p>
          </div>
          <button
            type="button"
            onClick={() => setSendOpen(true)}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-mint/40 bg-mint/10 px-5 py-2.5 text-sm font-semibold text-mint transition-all duration-300 hover:bg-mint/20 hover:shadow-mint sm:self-auto"
          >
            <Send className="h-4 w-4" />
            Send Payment
          </button>
        </div>

        <section className="mb-12 rounded-2xl border border-white/12 bg-gradient-to-br from-white/[0.06] via-transparent to-mint/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:p-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">
            Your Stellar Federation Address
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="break-all font-mono text-xl font-medium tracking-tight text-white md:text-2xl">
              {WALLET}
            </p>
            <button
              type="button"
              onClick={copyWallet}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-mint/40 hover:text-mint"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
          </div>
          <p className="mt-4 text-sm text-muted">Funds settle instantly to this address</p>
        </section>

        <section>
          <h2 className="mb-6 text-lg font-semibold text-white">Find Other Merchants</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => (
              <MerchantCard key={m.id} merchant={m} onView={setProfileMerchant} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-muted">No merchants match your search.</p>
          )}
        </section>
      </main>

      <Modal
        open={!!profileMerchant}
        title={profileMerchant?.name ?? ""}
        onClose={() => setProfileMerchant(null)}
        wide
      >
        {profileMerchant && (
          <div className="space-y-4 text-sm">
            <p className="font-mono text-mint">{profileMerchant.federationAddress}</p>
            <p className="text-muted">{profileMerchant.description}</p>
            <dl className="grid grid-cols-1 gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">Type</dt>
                <dd className="mt-0.5 capitalize text-white">{profileMerchant.type}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">Region</dt>
                <dd className="mt-0.5 text-white">{profileMerchant.region}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">Established</dt>
                <dd className="mt-0.5 text-white">{profileMerchant.established}</dd>
              </div>
            </dl>
            <p className="leading-relaxed text-muted">{profileMerchant.notes}</p>
            <button
              type="button"
              onClick={() => setProfileMerchant(null)}
              className="w-full rounded-lg border border-white/15 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      <SendPaymentModal open={sendOpen} onClose={() => setSendOpen(false)} merchants={MERCHANTS} />
    </div>
  );
}
