import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@lightrain/auth", "@lightrain/ui"],
};

export default nextConfig;
