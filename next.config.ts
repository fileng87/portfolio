import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/giscus/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://giscus.app',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
