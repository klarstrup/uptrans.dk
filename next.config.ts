import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverComponentsExternalPackages: ["zlib-sync"],
};

export default nextConfig;
