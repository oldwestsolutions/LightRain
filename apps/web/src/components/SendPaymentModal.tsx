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

  const fieldClass =
    "min-h-[48px] w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-base text-neutral-900 outline-none transition-colors focus:border-accent/40 focus:ring-2 focus:ring-accent/10 sm:text-sm";

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
            className={fieldClass}
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
            inputMode="decimal"
            className={`${fieldClass} font-mono`}
          />
        </div>
        <div>
          <label
            htmlFor="memo"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted"
          >
            Memo
          </label>
          <input id="memo" value={memo} onChange={(e) => setMemo(e.target.value)} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[48px] flex-1 touch-manipulation rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-base font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 active:bg-neutral-100 sm:flex-none sm:text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="flex min-h-[48px] min-w-0 flex-1 touch-manipulation items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-base font-semibold text-white transition-all hover:bg-neutral-800 active:bg-neutral-900 disabled:opacity-60 sm:min-w-[140px] sm:flex-none sm:text-sm"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
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
