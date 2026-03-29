import { useEffect, useState } from "react";
import { Mail, Store, UserRound, Wallet } from "lucide-react";
import { deriveInitialsFromName, type User, useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";
import { Modal } from "./Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  user: User;
  federationAddress: string;
  onMarketplace: () => void;
  onWallet: () => void;
};

export function ProfileOverviewModal({
  open,
  onClose,
  user,
  federationAddress,
  onMarketplace,
  onWallet,
}: Props) {
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const showToast = useToastStore((s) => s.show);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [handleInput, setHandleInput] = useState(() =>
    user.handle.startsWith("@") ? user.handle.slice(1) : user.handle
  );

  useEffect(() => {
    if (!open) return;
    setName(user.name);
    setEmail(user.email);
    setHandleInput(user.handle.startsWith("@") ? user.handle.slice(1) : user.handle);
  }, [open, user]);

  const previewInitials = deriveInitialsFromName(name);

  const save = () => {
    updateProfile({
      name: name.trim(),
      email: email.trim(),
      handle: handleInput.trim().replace(/^@/, ""),
    });
    showToast("Profile saved");
  };

  const fieldClass =
    "mt-1.5 min-h-[44px] w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-900/10";

  return (
    <Modal open={open} title="Profile" onClose={onClose} wide>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xl font-semibold text-white"
            aria-hidden
          >
            {previewInitials}
          </div>
          <div className="min-w-0 text-sm text-neutral-500">
            Avatar initials update from display name when you save.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onMarketplace();
            }}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
          >
            <Store className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            Marketplace
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onWallet();
            }}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
          >
            <Wallet className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            Wallet
          </button>
        </div>

        <div className="space-y-4 rounded-xl border border-neutral-200/90 bg-neutral-50/80 p-4">
          <div>
            <label htmlFor="profile-name" className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              <UserRound className="h-3.5 w-3.5" aria-hidden />
              Display name
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="profile-email" className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              <Mail className="h-3.5 w-3.5" aria-hidden />
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="profile-handle" className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Handle
            </label>
            <div className="relative mt-1.5">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
                @
              </span>
              <input
                id="profile-handle"
                type="text"
                value={handleInput}
                onChange={(e) => setHandleInput(e.target.value.replace(/^@/, ""))}
                autoComplete="username"
                className={`${fieldClass} pl-8 font-mono text-[13px]`}
                translate="no"
              />
            </div>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">Federation address</dt>
            <dd className="mt-1.5 break-all font-mono text-xs text-neutral-800" translate="no">
              {federationAddress}
            </dd>
          </div>
        </div>

        <button
          type="button"
          onClick={save}
          className="w-full min-h-[48px] rounded-xl border border-neutral-200 bg-neutral-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
        >
          Save changes
        </button>
      </div>
    </Modal>
  );
}
