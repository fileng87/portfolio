import "server-only";
import { cacheLife } from "next/cache";

// A Google Font cut down to just the glyphs in `text`, as TrueType: the
// format generated images (next/og) can read. Fetched when an image is built
// and cached from then on, so it always matches the text it draws.
export async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
) {
  "use cache";
  cacheLife("max");

  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`,
  ).then((res) => res.text());
  const src = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!src) throw new Error(`Google Fonts sent no TrueType for ${family}`);

  return fetch(src).then((res) => res.arrayBuffer());
}
