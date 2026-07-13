import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel сам управляет сборкой — standalone не нужен
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
