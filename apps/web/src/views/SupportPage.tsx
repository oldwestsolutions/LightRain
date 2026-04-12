"use client";

import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send } from "lucide-react";
import { MarketingPageShell } from "../components/MarketingPageShell";
import { useAuthStore } from "../store/useAuthStore";

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
      "Federation addresses map a human-readable label (for example mailbox*lightrain.in) to your receiving endpoint. " +
      "They keep counterparty communication legible without pasting raw routing details into every message. " +
      "After you sign in, you can copy yours from the dashboard; edge cases belong with whoever operates your settlement rails."
    );
  }
  if (t.includes("settlement") || t.includes("payment") || t.includes("pay")) {
    return (
      "Settlement timing depends on the asset, route, and counterparty policy you are on. " +
      "Your in-app history is the source of truth for status and timestamps. " +
      "This assistant cannot see your activity—use what you see on your dashboard when you talk to your operator or compliance team."
    );
  }
  if (t.includes("human") || t.includes("person") || t.includes("agent") || t.includes("call") || t.includes("email")) {
    return (
      "This demo cannot connect you to a live agent or read your account. " +
      "For anything account-specific—holds, limits, or production incidents—use the phone, email, or escalation path your organization has approved for LightRain."
    );
  }
  return (
    "Thanks for the message. I only run in your browser for orientation: federation labels, settlement context, and what to gather before you escalate. " +
    "I cannot access your session, vault, or tickets. Reach through your organization’s support channel when you need action on an account."
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
      extraWide
      compactTop
      backTo={isLoggedIn ? "/dashboard" : "/"}
      backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}
    >
      <section
        className="relative -mx-4 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-10 text-white shadow-[0_32px_80px_-24px_rgba(0,0,0,0.5)] sm:-mx-6 sm:px-8 sm:py-12 md:py-16"
        aria-labelledby="support-guided-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 120% 80% at 20% 0%, rgba(120,160,255,0.22), transparent 50%), radial-gradient(ellipse 90% 70% at 100% 100%, rgba(255,200,120,0.08), transparent 45%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.03)_45%,transparent_55%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
            <MessageCircle className="h-3.5 w-3.5 text-white/50" aria-hidden />
            Guided assistant
          </div>
          <h1 id="support-guided-heading" className="mt-3 font-display text-2xl font-normal tracking-[0.05em] sm:text-3xl md:text-4xl">
            LightRain assistant
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/72 sm:text-base">
            Demo assistant—runs in your browser. Use suggestions or free-form questions, then escalate to phone or email
            for anything account-specific.
          </p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-amber-200/80">
            Orientation only · cannot access your session
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65">
            Pick a starter prompt or describe your situation. We surface federation and settlement context so you know
            what to ask on the phone.
          </p>
        </div>

        <div
          className="relative mx-auto mt-10 flex max-h-[min(640px,75vh)] max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-sm"
          aria-label="Guided assistant chat"
        >
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3.5 sm:px-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-neutral-950 shadow-sm">
              <Bot className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">LightRain assistant</p>
              <p className="text-xs text-white/55">Orientation only · cannot access your session</p>
            </div>
          </div>

          <div className="min-h-[220px] flex-1 space-y-4 overflow-y-auto bg-black/25 p-4 sm:min-h-[280px] sm:p-5">
            {messages.length === 0 && !typing && (
              <div className="flex flex-col items-center justify-center py-6 text-center sm:py-8">
                <p className="max-w-md text-sm leading-relaxed text-white/60">
                  Pick a starter prompt or describe your situation. We surface federation and settlement context so you
                  know what to ask on the phone.
                </p>
                <div className="mt-6 flex max-w-lg flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendText(s)}
                      className="rounded-full border border-white/15 bg-white/[0.08] px-4 py-2.5 text-left text-xs font-medium text-white/90 shadow-sm transition-all hover:border-white/25 hover:bg-white/[0.12] sm:text-sm"
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
                      ? "max-w-[min(100%,22rem)] rounded-2xl rounded-br-md bg-white px-4 py-3 text-sm leading-relaxed text-neutral-900 shadow-md sm:max-w-[85%]"
                      : "max-w-[min(100%,24rem)] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-4 py-3 text-sm leading-relaxed text-white/90 shadow-sm sm:max-w-[85%]"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-5 py-3.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/50 [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/50 [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/50" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={onSubmit} className="border-t border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 shadow-inner focus-within:border-white/20 focus-within:ring-2 focus-within:ring-white/10">
              <label htmlFor="support-chat-input" className="sr-only">
                Message to assistant
              </label>
              <input
                id="support-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message to assistant…"
                autoComplete="off"
                className="min-h-[48px] flex-1 bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-neutral-950 transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </form>
        </div>
      </section>
    </MarketingPageShell>
  );
}
