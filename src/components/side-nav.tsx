import { useTranslations } from "next-intl";
import { introDelay } from "@/constants/intro";
import { sections } from "@/constants/sections";
import { IntroReveal } from "./intro-reveal";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

export function SideNav() {
  const t = useTranslations("Nav");

  return (
    <IntroReveal delay={introDelay.nav}>
      <nav
        aria-label={t("label")}
        className="fixed inset-y-0 left-0 z-20 hidden w-16 flex-col items-center py-6 md:flex"
      >
        <ul className="my-auto flex flex-col items-center gap-4">
          {sections.map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className="inline-block rounded-sm px-2 py-3 text-sm tracking-[0.3em] text-muted-foreground outline-none transition-colors duration-300 [writing-mode:vertical-rl] hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&:lang(en)]:rotate-180 [&:lang(en)]:tracking-widest"
              >
                {t(section)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-1">
          <LocaleSwitch label={t("switchLocale")} />
          <ThemeToggle label={t("toggleTheme")} />
        </div>
      </nav>
    </IntroReveal>
  );
}
