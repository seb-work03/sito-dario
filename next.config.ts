import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aukjtr1jp7weckhs.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
