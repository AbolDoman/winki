import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'company.novinlife.com',
        protocol: 'https',
      },
      {
        hostname: 'company.novinlife.com',
        protocol: 'http',
      },
      {
        hostname: 'company.winki.ir',
        protocol: 'https',
      },
      {
        hostname: 'company.winki.ir',
        protocol: 'http',
      },
      {
        hostname: 'api.winki.ir',
        protocol: 'https',
      },
      {
        hostname: 'api.winki.ir',
        protocol: 'http',
      },
      {
        hostname: 'test-backend.novinlife.com',
        protocol: 'https',
      },
      {
        hostname: 'test-backend.winki.ir',
        protocol: 'https',
      },
      {
        hostname: 'test-backend.winki.ir',
        protocol: 'http',
      },
      {
        hostname: 'trustseal.enamad.ir',
        protocol: 'https',
      },
      {
        hostname: 'via.placeholder.com',
        protocol: 'https',
      },
      {
        hostname: 'i.pravatar.cc',
        protocol: 'https',
      },
    ],
    minimumCacheTTL: 60,
    formats: ['image/webp', 'image/avif'],
    qualities: [60, 75, 80, 85, 100],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    optimizePackageImports: [
      'react-icons',
      '@tanstack/react-query',
      'react-hook-form',
      'embla-carousel-react',
      'embla-carousel-autoplay',
      'iconsax-reactjs',
      'react-spinners',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-select',
      '@radix-ui/react-switch',
    ],
    // Enable image optimization
    optimizeCss: true,
    webpackBuildWorker: true,
  },

  typescript: {
    ignoreBuildErrors: false,
  },
  // کاهش حجم output
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },
};

export default withBundleAnalyzer(nextConfig);
