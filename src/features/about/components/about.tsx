import { ArrowUpRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal, RevealItem, RevealList } from "@/components/reveal";
import { socials } from "@/constants/site";

export function About() {
  const t = useTranslations("About");

  return (
    <div className="flex flex-col items-center gap-12">
      <Reveal>
        <p className="max-w-xl text-lg leading-loose text-balance">
          {t("body")}
        </p>
      </Reveal>

      <RevealList className="flex flex-wrap justify-center gap-x-8 gap-y-4">
        {socials.map(({ icon, href }) => (
          <RevealItem key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground outline-none transition-colors duration-300 hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4 fill-current"
              >
                <path d={icon.path} />
              </svg>
              {icon.title}
              <ArrowUpRightIcon
                aria-hidden
                strokeWidth={1.25}
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
          </RevealItem>
        ))}
      </RevealList>
    </div>
  );
}
