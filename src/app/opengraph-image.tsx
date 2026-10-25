import { ImageResponse } from "next/og";
import { brandColors, symbolPaths } from "@/constants/brand";
import { shareImage, tagline, taglineEmphasis, url } from "@/constants/site";
import { loadGoogleFont } from "@/lib/google-font";

// The card shown when a link to the site is shared: the mark, the tagline
// with its highlighter stroke as in the hero, and the address, on night.
// The same for every locale, so it lives at the root; the page metadata
// names it (see app/[locale]/layout.tsx).

export const alt = shareImage.alt;
export const size = { width: shareImage.width, height: shareImage.height };
export const contentType = "image/png";

const host = new URL(url).host;
const fontSize = 128;

export default async function Image() {
  const [serif, sans] = await Promise.all([
    loadGoogleFont("Noto Serif TC", 300, tagline.join(" ")),
    loadGoogleFont("Geist", 400, host),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: brandColors.night,
        color: brandColors.moon,
      }}
    >
      <svg width={96} height={96} viewBox="0 0 256 256" aria-hidden="true">
        <path d={symbolPaths.z} fill={brandColors.moon} />
        <path d={symbolPaths.caret} fill={brandColors.caretDark} />
      </svg>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "Noto Serif TC",
          fontSize,
          lineHeight: 1.05,
        }}
      >
        {tagline.map((line) => (
          <div key={line} style={{ display: "flex", gap: fontSize * 0.25 }}>
            {line.split(" ").map((word) => (
              <div key={word} style={{ display: "flex", position: "relative" }}>
                {/* Drawn first so the word paints over it */}
                {word === taglineEmphasis && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: fontSize * 0.06,
                      height: fontSize * 0.3,
                      background: `${brandColors.caretDark}66`,
                    }}
                  />
                )}
                <span>{word}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          fontFamily: "Geist",
          fontSize: 32,
          color: brandColors.moonMuted,
        }}
      >
        {host}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Noto Serif TC", data: serif, weight: 300 },
        { name: "Geist", data: sans, weight: 400 },
      ],
    },
  );
}
