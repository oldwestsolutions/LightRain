import { Wallet } from "lucide-react";
import { Modal } from "./Modal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function WalletConnectModal({ open, onClose }: Props) {
  return (
    <Modal open={open} title="Connect with Wallet" onClose={onClose}>
      <p className="mb-4 text-sm leading-relaxed text-muted">
        LightRain uses Stellar federation addresses for settlement. Select your linked address or add a
        new one.
      </p>
      <div className="space-y-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-left transition-all duration-300 hover:border-neutral-300 hover:bg-white"
          onClick={onClose}
        >
          <Wallet className="h-5 w-5 text-accent" />
          <div>
            <p className="font-medium text-neutral-900">dispensary01*lightrain.in</p>
            <p className="text-xs text-muted">Primary · Stellar federation</p>
          </div>
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-dashed border-neutral-200 py-3 text-sm text-muted transition-colors hover:border-neutral-300 hover:text-neutral-800"
          onClick={onClose}
        >
          + Add federation address
        </button>
      </div>
    </Modal>
  );
}
