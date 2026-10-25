import { useTranslations } from "next-intl";
import { introDelay } from "@/constants/intro";
import { HomeLink } from "./home-link";
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
        {/* Pulled up so the mark sits as far from the top edge as from the left */}
        <HomeLink className="-mt-3" />

        <SectionLinks />

        <div className="flex flex-col items-center gap-1">
          <LocaleSwitch label={t("switchLocale")} />
          <ThemeToggle label={t("toggleTheme")} />
        </div>
      </nav>
    </IntroReveal>
  );
}
