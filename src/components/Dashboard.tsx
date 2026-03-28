import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Send } from "lucide-react";
import { MERCHANTS, type Merchant } from "../data/merchants";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";
import { MerchantCard } from "./MerchantCard";
import { Modal } from "./Modal";
import { Navbar } from "./Navbar";
import { SendPaymentModal } from "./SendPaymentModal";

const WALLET = "dispensary01*lightrain.in";

export function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user)!;
  const logout = useAuthStore((s) => s.logout);
  const showToast = useToastStore((s) => s.show);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

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
      showToast("Copied");
    }
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-[#ECECEF]">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-grid-faint bg-[length:32px_32px] opacity-25 sm:bg-[length:40px_40px] sm:opacity-30"
        aria-hidden
      />

      <Navbar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogout={handleLogout}
      />

      <main className="relative z-[2] mx-auto max-w-6xl px-3 pb-28 pt-[4.5rem] safe-pb sm:px-4 sm:pb-24 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-medium text-muted sm:text-sm">Account overview</p>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl md:text-[2rem] md:leading-tight">
              Welcome back, {user.name.split(" ")[0] ?? user.name}
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-[15px]">
              Your settlement address is ready. Send and receive crypto with the clarity of a modern
              bank—built for regulated commerce.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSendOpen(true)}
            className="inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-accent px-6 text-base font-semibold text-white shadow-soft transition-all duration-300 hover:bg-neutral-800 active:bg-neutral-900 sm:w-auto sm:self-auto sm:px-7 sm:text-sm"
          >
            <Send className="h-4 w-4 shrink-0" />
            Send payment
          </button>
        </div>

        <section className="mb-10 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-card sm:mb-14 sm:rounded-[28px] sm:p-8 md:p-10">
          <div className="mb-6 flex flex-col gap-3 border-b border-neutral-100 pb-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs">
                Federation address
              </p>
              <p className="mt-1 text-xs text-neutral-600 sm:text-sm">Instant settlement · Stellar network</p>
            </div>
            <span className="inline-flex w-fit items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
              Active
            </span>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
            <div className="min-w-0 flex-1">
              <p className="break-words font-mono text-lg font-medium leading-snug tracking-tight text-neutral-900 sm:break-all sm:text-xl md:text-2xl">
                {WALLET}
              </p>
              <p className="mt-3 text-xs text-muted sm:mt-4 sm:text-sm">Funds settle instantly to this address</p>
            </div>
            <button
              type="button"
              onClick={copyWallet}
              className="inline-flex min-h-[48px] w-full shrink-0 touch-manipulation items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-6 text-base font-semibold text-neutral-800 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100 sm:w-auto sm:text-sm"
            >
              <Copy className="h-4 w-4 shrink-0" />
              Copy address
            </button>
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-col gap-1 sm:mb-8 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">Merchants</h2>
            <p className="text-xs text-muted sm:text-sm">Discover partners on the LightRain network</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => (
              <MerchantCard key={m.id} merchant={m} onView={setProfileMerchant} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-muted sm:py-16">No merchants match your search.</p>
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
            <p className="break-words font-mono text-base text-accent sm:text-sm">{profileMerchant.federationAddress}</p>
            <p className="text-muted">{profileMerchant.description}</p>
            <dl className="grid grid-cols-1 gap-3 border-t border-neutral-200 pt-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">Type</dt>
                <dd className="mt-0.5 capitalize text-neutral-900">{profileMerchant.type}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">Region</dt>
                <dd className="mt-0.5 text-neutral-900">{profileMerchant.region}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">Established</dt>
                <dd className="mt-0.5 text-neutral-900">{profileMerchant.established}</dd>
              </div>
            </dl>
            <p className="leading-relaxed text-muted">{profileMerchant.notes}</p>
            <button
              type="button"
              onClick={() => setProfileMerchant(null)}
              className="min-h-[48px] w-full touch-manipulation rounded-xl border border-neutral-200 bg-white py-3 text-base font-semibold text-neutral-800 transition-colors hover:bg-neutral-50 active:bg-neutral-100 sm:text-sm"
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
