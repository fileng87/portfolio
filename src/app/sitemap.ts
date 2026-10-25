import type { MetadataRoute } from "next";
import { url } from "@/constants/site";
import { routing } from "@/i18n/routing";

// The default locale lives at the root, the others under their prefix
// (localePrefix "as-needed")
const localeUrl = (locale: string) =>
  locale === routing.defaultLocale ? url : `${url}/${locale}`;

// One page per locale, each pointing to the others as translations
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, localeUrl(locale)]),
  );

  return routing.locales.map((locale) => ({
    url: localeUrl(locale),
    alternates: { languages },
  }));
}
