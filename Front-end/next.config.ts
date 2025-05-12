import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
