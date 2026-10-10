import type { NextConfig } from "next";

// No remote images: the photos are static imports from app/_content/photos/, so next/image needs
// no remotePatterns - and can't be used as an image proxy for anyone else's.
const nextConfig: NextConfig = {};

export default nextConfig;
