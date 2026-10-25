import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  // ngrok tunnels for testing in dev: giscus can't load its theme from
  // localhost, since browsers block a public site reading a local address
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev"],
  // The giscus iframe loads its theme (public/giscus) with crossorigin set
  headers() {
    return [
      {
        source: "/giscus/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://giscus.app" },
          // Switching theme swaps the stylesheet; refetching it each time
          // keeps the widget a beat behind the rest of the page
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
  images: {
    // YouTube video thumbnails
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
