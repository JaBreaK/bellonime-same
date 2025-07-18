import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        // Ganti hostname ini sesuai URL gambar dari API
        hostname: 'samehadaku.now', 
      },
    ],
  },
};

export default nextConfig;
