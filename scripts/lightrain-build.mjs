/**
 * Vercel: set env LIGHT_RAIN_VERCEL_APP to web | wallet | admin on each project
 * so a repo-root deployment only builds that app (and workspaces still install from root).
 * Locally, omit the env to build all apps (same as before).
 *
 * When VERCEL is set and Root Directory is ".", Vercel looks for Next output at the repo
 * root. After a single-app build we copy (not symlink) that app's .next, next.config.ts,
 * and public to the root — Vercel's Next.js step does not reliably treat symlinked .next
 * as present. Set LIGHT_RAIN_VERCEL_APP=web|wallet|admin on each root-based project.
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

function materializeAppAtRootForVercel(appFolder) {
  const appDir = path.join(root, "apps", appFolder);
  const items = [
    { name: ".next", isDir: true },
    { name: "next.config.ts", isDir: false },
    { name: "public", isDir: true },
  ];
  for (const { name, isDir } of items) {
    const target = path.join(appDir, name);
    if (!fs.existsSync(target)) {
      console.error(
        `[lightrain-build] Missing ${target} after build; Next output must exist before copying to repo root.`,
      );
      process.exit(1);
    }
    const dest = path.join(root, name);
    removePath(dest);
    if (isDir) fs.cpSync(target, dest, { recursive: true });
    else fs.copyFileSync(target, dest);
  }
  const buildId = path.join(root, ".next", "BUILD_ID");
  if (!fs.existsSync(buildId)) {
    console.error(
      "[lightrain-build] Copied .next but BUILD_ID is missing; build may be incomplete.",
    );
    process.exit(1);
  }
  console.log(
    `[lightrain-build] Copied apps/${appFolder} (.next, public, next.config.ts) to repo root for Vercel.`,
  );
}

const key = (process.env.LIGHT_RAIN_VERCEL_APP || "").toLowerCase().trim();
const workspace = MAP[key];

if (workspace) {
  const appDir = path.join(root, "apps", key);
  execSync("npm run build", { stdio: "inherit", cwd: appDir });
  if (process.env.VERCEL) materializeAppAtRootForVercel(key);
} else {
  if (process.env.VERCEL) {
    console.error(
      "[lightrain-build] On Vercel with Root Directory \".\", set env LIGHT_RAIN_VERCEL_APP=web|wallet|admin on this project. Otherwise .next is never copied to the repo root and the deploy fails.",
    );
    process.exit(1);
  }
  execSync(
    "npm run build -w @lightrain/web && npm run build -w @lightrain/wallet && npm run build -w @lightrain/admin",
    { stdio: "inherit" },
  );
}
