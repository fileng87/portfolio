import { useTranslations } from "next-intl";
import { MobileNav } from "@/components/mobile-nav";
import { SideNav } from "@/components/side-nav";
import { sections } from "@/constants/sections";
import { Hero, HeroStage } from "@/features/hero";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <SideNav />
      <MobileNav>
        <main className="flex-1">
          <HeroStage hero={<Hero />}>
            <div className="mx-auto flex max-w-2xl flex-col px-6 md:pl-22">
              {sections.map((section) => (
                <section
                  key={section}
                  id={section}
                  className="flex min-h-[60svh] scroll-mt-8 flex-col gap-4 py-24"
                >
                  <h2 className="font-serif text-2xl font-light tracking-[0.1em]">
                    {t(`Nav.${section}`)}
                  </h2>
                  <p className="text-muted-foreground">{t("Placeholder")}</p>
                </section>
              ))}
            </div>
          </HeroStage>
        </main>
      </MobileNav>
    </>
  );
}
