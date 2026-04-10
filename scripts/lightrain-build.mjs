/**
 * Vercel: set env LIGHT_RAIN_VERCEL_APP to web | wallet | admin on each project
 * so a repo-root deployment only builds that app (and workspaces still install from root).
 * Locally, omit the env to build all apps (same as before).
 *
 * Root Directory "." on Vercel: `next build` runs in apps/<app>/.next. Vercel then expects
 * path0/.next — we symlink repo-root .next → apps/<app>/.next (do not copy: copying breaks
 * Node File Trace / @swc path resolution).
 * If VERCEL is set but LIGHT_RAIN_VERCEL_APP is missing, we default to web and warn.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const MAP = {
  web: "@lightrain/web",
  wallet: "@lightrain/wallet",
  admin: "@lightrain/admin",
};

function removePath(dest) {
  try {
    if (!fs.existsSync(dest)) return;
    const st = fs.lstatSync(dest);
    if (st.isSymbolicLink()) fs.unlinkSync(dest);
    else fs.rmSync(dest, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
}

/**
 * Makes /vercel/path0/.next exist without duplicating traced files (symlink, not copy).
 */
function linkDotNextAtRepoRootForVercel(appKey) {
  if (!process.env.VERCEL) return;
  const target = path.join(root, "apps", appKey, ".next");
  const dest = path.join(root, ".next");
  if (!fs.existsSync(target)) {
    console.error(
      `[lightrain-build] Missing ${target} after build; cannot link path0/.next.`,
    );
    process.exit(1);
  }
  removePath(dest);
  let rel = path.relative(path.dirname(dest), target);
  if (path.sep !== "/") rel = rel.split(path.sep).join("/");
  const linkType = process.platform === "win32" ? "junction" : "dir";
  fs.symlinkSync(rel, dest, linkType);
  console.log(
    `[lightrain-build] Linked .next → apps/${appKey}/.next for Vercel (path0/.next).`,
  );
}

function buildOneAppForVercelRoot(appKey) {
  const appDir = path.join(root, "apps", appKey);
  execSync("npm run build", { stdio: "inherit", cwd: appDir });
  linkDotNextAtRepoRootForVercel(appKey);
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
