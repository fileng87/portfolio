import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_TC,
  Noto_Serif_TC,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { name, shareImage, tagline, url } from "@/constants/site";
import { routing } from "@/i18n/routing";
import { MotionProvider } from "@/providers/motion-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Chinese for the sans stack, after Geist (see --font-sans): Geist draws the
// latin, so nothing is preloaded and only the CJK chunks a page uses load
const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  preload: false,
});

// CJK glyphs are served as unicode-range chunks, so only latin is preloaded
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  weight: ["300", "400"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const locale = await getLocale();
  const title = `${name} — ${tagline.join(" ")}`;
  const description = t("description", { name });

  // The share image is generated once at the root (app/opengraph-image.tsx),
  // outside [locale], so it's named here rather than picked up by convention
  const image = { url: "/opengraph-image", ...shareImage };

  return {
    // Makes the share image's URL absolute
    metadataBase: new URL(url),
    title,
    description,
    openGraph: {
      type: "website",
      siteName: name,
      title,
      description,
      locale: locale.replace("-", "_"),
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansTC.variable} ${notoSerifTC.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <ThemeProvider>
            <MotionProvider>{children}</MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
