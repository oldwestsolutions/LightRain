import { Link } from "react-router-dom";
import { Mail, UserRound } from "lucide-react";
import type { User } from "../store/useAuthStore";
import { Modal } from "./Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  user: User;
  federationAddress: string;
};

export function ProfileOverviewModal({ open, onClose, user, federationAddress }: Props) {
  const handle = user.handle.startsWith("@") ? user.handle.slice(1) : user.handle;
  const displayHandle = `@${handle}`;

  return (
    <Modal open={open} title="Profile" onClose={onClose} wide>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xl font-semibold text-white"
            aria-hidden
          >
            {user.initials}
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold text-neutral-900">{user.name}</p>
            <p className="mt-0.5 text-sm font-medium text-accent">{displayHandle}</p>
            <p className="mt-1 truncate text-xs text-neutral-500">{user.email}</p>
          </div>
        </div>

        <dl className="space-y-4 rounded-xl border border-neutral-200/90 bg-neutral-50/80 p-4">
          <div>
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              <UserRound className="h-3.5 w-3.5" aria-hidden />
              Display name
            </dt>
            <dd className="mt-1 text-sm text-neutral-900">{user.name}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              <Mail className="h-3.5 w-3.5" aria-hidden />
              Email
            </dt>
            <dd className="mt-1 break-all text-sm text-neutral-900">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">Handle</dt>
            <dd className="mt-1 text-sm font-medium text-neutral-900">{displayHandle}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">Federation address</dt>
            <dd className="mt-1 break-all font-mono text-xs text-neutral-800" translate="no">
              {federationAddress}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/account/profile"
            onClick={onClose}
            className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
          >
            Profile & settings
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
}
