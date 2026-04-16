import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable source maps in development for better debugging
  productionBrowserSourceMaps: false,
  // Turbopack config (Next.js 16 uses Turbopack by default)
  turbopack: {},
  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pos.bme.com.bd',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'posftp.bme.com.bd',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
