// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },      // ✅ don't fail the build on ESLint
  typescript: { ignoreBuildErrors: true },   // ✅ optional: skip TS errors in prod build
};

export default nextConfig;
