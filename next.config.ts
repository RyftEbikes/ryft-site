// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },      // don't fail build on ESLint
  typescript: { ignoreBuildErrors: true },   // (optional) don't fail on TS
};

export default nextConfig;
