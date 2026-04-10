export function SignInGate() {
  const web = (process.env.NEXT_PUBLIC_WEB_ORIGIN || "https://lightra.in").replace(/\/$/, "");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Sign in to open your wallet
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Sessions are shared across <span className="font-medium">.lightra.in</span> when configured. On local
          development, sign in from the marketing app to be redirected here with a secure handoff.
        </p>
        <a
          href={`${web}/`}
          className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Continue to lightra.in
        </a>
      </div>
    </div>
  );
}
