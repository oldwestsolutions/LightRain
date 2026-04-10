"use client";

import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Bot, Clock, Headphones, Mail, MessageCircle, Phone, Send, Shield } from "lucide-react";
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

const FAQ = [
  {
    q: "What is a federation address?",
    a: "A human-readable receiving label (like mailbox*lightrain.in) mapped to your settlement endpoint. It keeps counterparty comms legible without exposing raw routing details in every email.",
  },
  {
    q: "Is this live support?",
    a: "Phone and email reach our operator desk (demo numbers). The chat assistant runs locally in your browser and cannot see your vault—use it for orientation, then call or email for account-specific issues.",
  },
  {
    q: "How fast are settlements?",
    a: "Timing depends on asset, route, and counterparty policy. Your dashboard history is the source of truth; include timestamps when you contact support.",
  },
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
      extraWide
      compactTop
      backTo={isLoggedIn ? "/dashboard" : "/"}
      backLabel={isLoggedIn ? "Back to dashboard" : "Back to sign in"}
    >
      <div className="space-y-0">
        {/* Immersive hero */}
        <section
          className="relative -mx-4 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-950 px-4 py-14 text-white shadow-[0_32px_80px_-24px_rgba(0,0,0,0.45)] sm:-mx-6 sm:px-8 sm:py-16 md:py-20"
          aria-labelledby="support-hero-heading"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 120% 80% at 20% 0%, rgba(120,160,255,0.35), transparent 50%), radial-gradient(ellipse 90% 70% at 100% 100%, rgba(255,200,120,0.12), transparent 45%)",
            }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.03)_45%,transparent_55%)]" aria-hidden />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">support.lightra.in</p>
            <h1
              id="support-hero-heading"
              className="mt-4 font-display text-3xl font-normal tracking-[0.06em] sm:text-4xl md:text-5xl"
            >
              Operator support
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
              Voice, mail, and guided chat—built for settlement stress and federation questions. Nothing here replaces
              your counsel or network rules; we help you move faster inside the rails you already chose.
            </p>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-4 backdrop-blur-sm">
                <Clock className="mx-auto h-6 w-6 text-amber-200/90" aria-hidden />
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/50">Desk hours</p>
                <p className="mt-1 text-sm font-semibold text-white">{HOURS_LINE}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-4 backdrop-blur-sm">
                <Shield className="mx-auto h-6 w-6 text-emerald-200/90" aria-hidden />
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/50">Vault-safe</p>
                <p className="mt-1 text-sm font-semibold text-white">No vault keys in chat</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-4 backdrop-blur-sm">
                <Headphones className="mx-auto h-6 w-6 text-sky-200/90" aria-hidden />
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/50">Escalation</p>
                <p className="mt-1 text-sm font-semibold text-white">Phone &amp; email first</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact strip */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2 lg:mt-12">
          <a
            href={`tel:${SUPPORT_PHONE_TEL}`}
            className="group flex flex-col rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-lg sm:p-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900 text-white transition-transform group-hover:scale-105">
              <Phone className="h-6 w-6" aria-hidden />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Call the desk</p>
            <p className="mt-2 font-mono text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              {SUPPORT_PHONE_DISPLAY}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{HOURS_LINE} · Tap on mobile to dial</p>
          </a>

          <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-inner sm:p-8">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-900">
                <Mail className="h-6 w-6" aria-hidden />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Written trail</p>
              <p className="mt-2 text-lg font-semibold text-neutral-900">support@lightrain.in</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Include your federation address, approximate time window, and what you expected vs. what you saw. Attach
                dashboard screenshots when it helps.
              </p>
            </div>
            <a
              href="mailto:support@lightrain.in"
              className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-neutral-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Compose email
            </a>
          </div>
        </div>

        {/* Chat */}
        <section className="mx-auto mt-12 max-w-5xl lg:mt-16" aria-labelledby="support-chat-heading">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="support-chat-heading" className="flex items-center gap-2 text-xl font-semibold text-neutral-900 sm:text-2xl">
                <MessageCircle className="h-6 w-6 text-accent" aria-hidden />
                Guided assistant
              </h2>
              <p className="mt-1 max-w-xl text-sm text-muted">
                Demo assistant—runs in your browser. Use suggestions or free-form questions, then escalate to phone or
                email for anything account-specific.
              </p>
            </div>
          </div>

          <div
            className="flex max-h-[min(620px,72vh)] flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.15)]"
            aria-label="Support chat"
          >
            <div className="flex items-center gap-3 border-b border-neutral-200/80 bg-gradient-to-r from-neutral-50 to-white px-4 py-3.5 sm:px-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-sm">
                <Bot className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">LightRain assistant</p>
                <p className="text-xs text-muted">Orientation only · cannot access your session</p>
              </div>
            </div>

            <div className="min-h-[260px] flex-1 space-y-4 overflow-y-auto bg-[linear-gradient(180deg,#f4f4f5_0%,#ececee_100%)] p-4 sm:min-h-[300px] sm:p-6">
              {messages.length === 0 && !typing && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <p className="max-w-md text-sm leading-relaxed text-muted">
                    Pick a starter prompt or describe your situation. We surface federation and settlement context so
                    you know what to ask on the phone.
                  </p>
                  <div className="mt-6 flex max-w-lg flex-wrap justify-center gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendText(s)}
                        className="rounded-full border border-neutral-200/90 bg-white px-4 py-2.5 text-left text-xs font-medium text-neutral-800 shadow-sm transition-all hover:border-neutral-300 hover:shadow-md sm:text-sm"
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
                        ? "max-w-[min(100%,22rem)] rounded-2xl rounded-br-md bg-neutral-900 px-4 py-3 text-sm leading-relaxed text-white shadow-md sm:max-w-[85%]"
                        : "max-w-[min(100%,24rem)] rounded-2xl rounded-bl-md border border-neutral-200/80 bg-white px-4 py-3 text-sm leading-relaxed text-neutral-800 shadow-sm sm:max-w-[85%]"
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-neutral-200/80 bg-white px-5 py-3.5 shadow-sm">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.1s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={onSubmit} className="border-t border-neutral-200/80 bg-white p-4 sm:p-5">
              <div className="flex items-end gap-2 rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-2 shadow-inner focus-within:border-neutral-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-neutral-900/10">
                <label htmlFor="support-chat-input" className="sr-only">
                  Message to assistant
                </label>
                <input
                  id="support-chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe what you need…"
                  autoComplete="off"
                  className="min-h-[48px] flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-14 max-w-5xl pb-4 lg:mt-20" aria-labelledby="support-faq-heading">
          <h2 id="support-faq-heading" className="text-center font-display text-2xl font-normal tracking-[0.05em] text-neutral-900 sm:text-3xl">
            Common questions
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted">
            Short answers to what operators ask before they open a ticket.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {FAQ.map((item) => (
              <article
                key={item.q}
                className="rounded-2xl border border-neutral-200/90 bg-white/95 p-6 shadow-sm ring-1 ring-black/[0.02] backdrop-blur-sm"
              >
                <p className="text-sm font-semibold text-neutral-900">{item.q}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </MarketingPageShell>
  );
}
