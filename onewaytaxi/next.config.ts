import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Required for Docker build
  reactStrictMode: true,
  images: {
    unoptimized: true, // For now, avoids complexity with optimization in k8s
  },
};

export default nextConfig;
