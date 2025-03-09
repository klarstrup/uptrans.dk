import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["zlib-sync"],
  },
};

export default nextConfig;
