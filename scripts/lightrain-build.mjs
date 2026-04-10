/**
 * Vercel: set env LIGHT_RAIN_VERCEL_APP to web | wallet | admin on each project
 * so a repo-root deployment only builds that app (and workspaces still install from root).
 * Locally, omit the env to build all apps (same as before).
 */
import { execSync } from "node:child_process";

const MAP = {
  web: "@lightrain/web",
  wallet: "@lightrain/wallet",
  admin: "@lightrain/admin",
};

const key = (process.env.LIGHT_RAIN_VERCEL_APP || "").toLowerCase().trim();
const workspace = MAP[key];

if (workspace) {
  execSync(`npm run build -w ${workspace}`, { stdio: "inherit" });
} else {
  execSync(
    "npm run build -w @lightrain/web && npm run build -w @lightrain/wallet && npm run build -w @lightrain/admin",
    { stdio: "inherit" },
  );
}
