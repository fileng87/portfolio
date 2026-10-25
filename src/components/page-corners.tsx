import { useTranslations } from "next-intl";
import { HomeLink } from "./home-link";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

// The side nav's corners without its section links, for pages other than
// home: the logo top left, language and theme bottom left
export function PageCorners() {
  const t = useTranslations("Nav");

  return (
    <>
      <div className="fixed top-6 left-0 flex w-16 justify-center">
        <HomeLink page className="-mt-3" />
      </div>
      <div className="fixed bottom-6 left-0 flex w-16 flex-col items-center gap-1">
        <LocaleSwitch label={t("switchLocale")} />
        <ThemeToggle label={t("toggleTheme")} />
      </div>
    </>
  );
}
