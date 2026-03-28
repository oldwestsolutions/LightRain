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
        LightRain uses Stellar federation addresses for settlement. Select your linked address or add
        a new one (mock).
      </p>
      <div className="space-y-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg border border-white/20 bg-white/[0.03] px-4 py-3 text-left transition-all duration-300 hover:border-mint/50 hover:bg-white/[0.06]"
          onClick={onClose}
        >
          <Wallet className="h-5 w-5 text-mint" />
          <div>
            <p className="font-medium text-white">dispensary01*lightra.in</p>
            <p className="text-xs text-muted">Primary · Stellar federation</p>
          </div>
        </button>
        <button
          type="button"
          className="w-full rounded-lg border border-dashed border-white/20 py-3 text-sm text-muted transition-colors hover:border-white/35 hover:text-white"
          onClick={onClose}
        >
          + Add federation address
        </button>
      </div>
    </Modal>
  );
}
