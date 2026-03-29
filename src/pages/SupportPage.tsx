import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Bot, Phone, Send } from "lucide-react";
import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";

const SUPPORT_PHONE_DISPLAY = "(888) 555-0123";
const SUPPORT_PHONE_TEL = "+18885550123";
const HOURS_LINE = "Mon–Fri · 9:00 AM – 6:00 PM ET";

type Msg = { id: string; role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "How do federation addresses work?",
  "I need help with a settlement",
  "Connect me with a person",
] as const;

function replyForMessage(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("federation") || t.includes("address")) {
    return (
      "Federation addresses map a name like mailbox*lightrain.in to your receiving endpoint on the network. " +
      "After you sign in, you can copy yours from the dashboard. For edge cases, email support@lightrain.in with your address."
    );
  }
  if (t.includes("settlement") || t.includes("payment") || t.includes("pay")) {
    return (
      "Settlement timing depends on the asset and route you use. Check your dashboard history for status. " +
      "If something looks stuck, call the number above during business hours or email support@lightrain.in with the transaction details."
    );
  }
  if (t.includes("human") || t.includes("person") || t.includes("agent") || t.includes("call")) {
    return (
      "For live help, call " +
      SUPPORT_PHONE_DISPLAY +
      " during " +
      HOURS_LINE +
      ". You can also email support@lightrain.in—include your federation address and a short summary."
    );
  }
  return (
    "Thanks for your message. For the fastest help with account or settlement issues, call " +
    SUPPORT_PHONE_DISPLAY +
    " (" +
    HOURS_LINE +
    ") or email support@lightrain.in. I’m a demo assistant and can’t access your account."
  );
}

function nextId() {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function SupportPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  const pushAssistant = (text: string) => {
    setMessages((prev) => [...prev, { id: nextId(), role: "assistant", text }]);
  };

  const sendText = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed || typing) return;

    setMessages((prev) => [...prev, { id: nextId(), role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      setTyping(false);
      pushAssistant(replyForMessage(trimmed));
    }, 600 + Math.random() * 400);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendText(input);
  };

  return (
    <MarketingPageShell
      wide
      backTo={isLoggedIn ? "/dashboard" : "/"}
      backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}
    >
      <div className="space-y-5">
        <header>
          <h1 className="font-display text-2xl font-normal tracking-[0.06em] text-neutral-900 sm:text-3xl">Support</h1>
          <p className="mt-1.5 text-sm text-muted">Call during business hours, or message the assistant below.</p>
        </header>

        {/* Robinhood-style phone strip */}
        <a
          href={`tel:${SUPPORT_PHONE_TEL}`}
          className="flex items-center gap-4 rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-soft transition-colors hover:border-neutral-300 hover:bg-neutral-50/80 sm:p-5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white">
            <Phone className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Phone</p>
            <p className="mt-0.5 font-mono text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
              {SUPPORT_PHONE_DISPLAY}
            </p>
            <p className="mt-1 text-xs text-muted">{HOURS_LINE} · Tap to call</p>
          </div>
        </a>

        {/* ChatGPT-style chat panel */}
        <section
          className="flex max-h-[min(560px,70vh)] flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-card"
          aria-label="Support chat"
        >
          <div className="flex items-center gap-2 border-b border-neutral-200/80 bg-neutral-50/90 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
              <Bot className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">Assistant</p>
              <p className="text-xs text-muted">Demo · Not a substitute for phone or email</p>
            </div>
          </div>

          <div className="min-h-[240px] flex-1 space-y-4 overflow-y-auto bg-[#F4F4F5] p-4 sm:min-h-[280px] sm:p-5">
            {messages.length === 0 && !typing && (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="max-w-sm text-sm text-muted">Ask anything about LightRain, or pick a prompt.</p>
                <div className="mt-4 flex max-w-md flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendText(s)}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-left text-xs font-medium text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 sm:text-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[min(100%,20rem)] rounded-2xl rounded-br-md bg-neutral-900 px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm sm:max-w-[85%] sm:rounded-2xl sm:rounded-br-md"
                      : "max-w-[min(100%,22rem)] rounded-2xl rounded-bl-md border border-neutral-200/80 bg-white px-4 py-2.5 text-sm leading-relaxed text-neutral-800 shadow-sm sm:max-w-[85%]"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-neutral-200/80 bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={onSubmit} className="border-t border-neutral-200/80 bg-white p-3 sm:p-4">
            <div className="flex items-end gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 shadow-sm focus-within:border-neutral-300 focus-within:ring-2 focus-within:ring-neutral-900/10">
              <label htmlFor="support-chat-input" className="sr-only">
                Message to assistant
              </label>
              <input
                id="support-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message…"
                autoComplete="off"
                className="min-h-[44px] flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted">
              Prefer email?{" "}
              <a href="mailto:support@lightrain.in" className="font-medium text-accent underline-offset-2 hover:underline">
                support@lightrain.in
              </a>
            </p>
          </form>
        </section>
      </div>
    </MarketingPageShell>
  );
}
