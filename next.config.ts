import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["three"],
  // ビルドエラーを無視
  ignoreBuildErrors: true,
};

export default nextConfig;
