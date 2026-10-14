import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist_next",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
