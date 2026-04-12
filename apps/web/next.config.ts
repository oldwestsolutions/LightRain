import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@lightrain/auth"],
  async redirects() {
    return [
      { source: "/dashboard", destination: "/wallet", permanent: true },
      { source: "/governance-risk", destination: "/governance", permanent: true },
      { source: "/security-model", destination: "/whitepaper", permanent: true },
    ];
  },
};

export default nextConfig;
