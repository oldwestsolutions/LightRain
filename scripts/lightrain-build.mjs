/**
 * Vercel: set env LIGHT_RAIN_VERCEL_APP to web | wallet | admin on each project
 * so a repo-root deployment only builds that app (and workspaces still install from root).
 * Locally, omit the env to build all apps (same as before).
 *
 * Root Directory "." on Vercel: we only run `next build` under apps/<app> — we do NOT copy
 * .next to the repo root. Copying breaks Node File Trace (.nft.json) paths and causes
 * errors like lstat '/node_modules/@swc/helpers/...'. Set the Vercel project
 * Output Directory to apps/web/.next, apps/wallet/.next, or apps/admin/.next (see VERCEL.txt).
 * If VERCEL is set but LIGHT_RAIN_VERCEL_APP is missing, we default to web and warn.
 */
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const MAP = {
  web: "@lightrain/web",
  wallet: "@lightrain/wallet",
  admin: "@lightrain/admin",
};

function logVercelOutputDir(appKey) {
  if (!process.env.VERCEL) return;
  console.log(
    `[lightrain-build] Vercel (Root Directory \".\"): set this project’s Output Directory to apps/${appKey}/.next so the traced server bundle resolves node_modules correctly.`,
  );
}

function buildOneAppForVercelRoot(appKey) {
  const appDir = path.join(root, "apps", appKey);
  execSync("npm run build", { stdio: "inherit", cwd: appDir });
  logVercelOutputDir(appKey);
}

const key = (process.env.LIGHT_RAIN_VERCEL_APP || "").toLowerCase().trim();
const workspace = MAP[key];

if (workspace) {
  buildOneAppForVercelRoot(key);
} else if (process.env.VERCEL) {
  const fallback = "web";
  console.warn(
    `[lightrain-build] LIGHT_RAIN_VERCEL_APP not set; using "${fallback}" for this Vercel root deploy. Set LIGHT_RAIN_VERCEL_APP=wallet|admin for those apps, or set Root Directory to apps/<app>.`,
  );
  buildOneAppForVercelRoot(fallback);
} else {
  execSync(
    "npm run build -w @lightrain/web && npm run build -w @lightrain/wallet && npm run build -w @lightrain/admin",
    { stdio: "inherit" },
  );
}
