import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image fetches and resizes remote photos through our own server, so it only accepts
    // hosts listed here - otherwise anyone could use us as a free image proxy.
    // Unsplash: our stock photos (app/_lib/photos.ts), until the club has its own.
    remotePatterns: [new URL("https://images.unsplash.com/**")],
  },
};

export default nextConfig;
