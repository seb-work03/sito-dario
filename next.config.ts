import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
