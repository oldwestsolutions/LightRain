/**
 * Vercel: set env LIGHT_RAIN_VERCEL_APP to web | wallet | admin on each project
 * so a repo-root deployment only builds that app (and workspaces still install from root).
 * Locally, omit the env to build all apps (same as before).
 *
 * When VERCEL is set and Root Directory is ".", Vercel looks for Next output at the repo
 * root. After a single-app build we symlink that app's .next, next.config.ts, and public
 * to the root so the Next preset finds them (and a mistaken dashboard "public" output dir
 * resolves to a real folder).
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

function linkAppToRootForVercel(appFolder) {
  const appDir = path.join(root, "apps", appFolder);
  const dirType = process.platform === "win32" ? "junction" : "dir";
  const links = [
    { name: ".next", type: dirType },
    { name: "next.config.ts", type: "file" },
    { name: "public", type: dirType },
  ];
  for (const { name, type } of links) {
    const target = path.join(appDir, name);
    if (!fs.existsSync(target)) continue;
    const dest = path.join(root, name);
    removePath(dest);
    const rel = path.relative(path.dirname(dest), target);
    try {
      fs.symlinkSync(rel, dest, type);
    } catch {
      if (type === "file") fs.copyFileSync(target, dest);
      else fs.cpSync(target, dest, { recursive: true });
    }
  }
}

const key = (process.env.LIGHT_RAIN_VERCEL_APP || "").toLowerCase().trim();
const workspace = MAP[key];

if (process.env.VERCEL && !workspace) {
  console.warn(
    "[lightrain-build] VERCEL is set but LIGHT_RAIN_VERCEL_APP is missing; set it to web, wallet, or admin when deploying from repo root.",
  );
}

if (workspace) {
  execSync(`npm run build -w ${workspace}`, { stdio: "inherit" });
  if (process.env.VERCEL && key) linkAppToRootForVercel(key);
} else {
  execSync(
    "npm run build -w @lightrain/web && npm run build -w @lightrain/wallet && npm run build -w @lightrain/admin",
    { stdio: "inherit" },
  );
}
