export function ForbiddenPage() {
  const wallet = (process.env.NEXT_PUBLIC_WALLET_ORIGIN || "https://wallet.lightra.in").replace(/\/$/, "");
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Restricted control plane</h1>
      <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
        Your account does not have internal operator privileges. Continue in the wallet or contact security if you
        believe this is an error.
      </p>
      <a
        href={`${wallet}/`}
        className="mt-6 inline-flex h-10 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Open wallet
      </a>
    </div>
  );
}
