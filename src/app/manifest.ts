import type { MetadataRoute } from "next";
import { brandColors } from "@/constants/brand";
import { name, tagline } from "@/constants/site";

// What a phone shows when the site is added to the home screen. The icons
// are the night app tiles from brand/symbol.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${name} — ${tagline.join(" ")}`,
    short_name: name,
    start_url: "/",
    display: "standalone",
    background_color: brandColors.night,
    theme_color: brandColors.night,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
