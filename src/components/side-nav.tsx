import { useTranslations } from "next-intl";
import { introDelay } from "@/constants/intro";
import { IntroReveal } from "./intro-reveal";
import { LocaleSwitch } from "./locale-switch";
import { SectionLinks } from "./section-links";
import { ThemeToggle } from "./theme-toggle";

export function SideNav() {
  const t = useTranslations("Nav");

  return (
    <IntroReveal delay={introDelay.nav}>
      <nav
        aria-label={t("label")}
        className="fixed inset-y-0 left-0 z-20 hidden w-16 flex-col items-center py-6 md:flex"
      >
        <SectionLinks />

        <div className="flex flex-col items-center gap-1">
          <LocaleSwitch label={t("switchLocale")} />
          <ThemeToggle label={t("toggleTheme")} />
        </div>
      </nav>
    </IntroReveal>
  );
}
