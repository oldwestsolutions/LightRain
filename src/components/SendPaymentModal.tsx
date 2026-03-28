import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { Merchant } from "../data/merchants";
import { Modal } from "./Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  merchants: Merchant[];
};

export function SendPaymentModal({ open, onClose, merchants }: Props) {
  const [toId, setToId] = useState(merchants[0]?.id ?? "");
  const [amount, setAmount] = useState("125.00");
  const [memo, setMemo] = useState("Invoice #LR-2048");
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      onClose();
    }, 900);
  };

  return (
    <Modal open={open} title="Send Payment" onClose={onClose} wide>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label
            htmlFor="pay-to"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
          >
            Recipient merchant
          </label>
          <select
            id="pay-to"
            value={toId}
            onChange={(e) => setToId(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-accent/40 focus:ring-2 focus:ring-accent/10"
          >
            {merchants.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} — {m.federationAddress}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="amount"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
          >
            Amount (USDC / XLM display)
          </label>
          <input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 font-mono text-sm text-neutral-900 outline-none transition-colors focus:border-accent/40 focus:ring-2 focus:ring-accent/10"
          />
        </div>
        <div>
          <label
            htmlFor="memo"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
          >
            Memo
          </label>
          <input
            id="memo"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-accent/40 focus:ring-2 focus:ring-accent/10"
          />
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 min-[400px]:flex-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="flex min-w-[140px] flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-neutral-800 disabled:opacity-60 min-[400px]:flex-none"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
