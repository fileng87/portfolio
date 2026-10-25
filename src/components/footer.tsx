import { ArrowUpRightIcon } from "lucide-react";
import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";
import { name, sourceUrl } from "@/constants/site";
import { Reveal } from "./reveal";

// Captured into the cached page, refreshed daily so it rolls over at New Year
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const t = await getTranslations("Footer");
  const year = await currentYear();

  return (
    <footer className="border-t py-10">
      <Reveal className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 text-sm text-muted-foreground">
        <p>
          © {year} {name} · {t("note")}
        </p>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-sm outline-none transition-colors duration-300 hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("source")}
          <ArrowUpRightIcon
            strokeWidth={1.25}
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
        </a>
      </Reveal>
    </footer>
  );
}
