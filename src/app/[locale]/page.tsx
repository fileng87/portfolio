import { useTranslations } from "next-intl";
import { MobileNav } from "@/components/mobile-nav";
import { Section } from "@/components/section";
import { SideNav } from "@/components/side-nav";
import { Hero, HeroStage } from "@/features/hero";
import { Projects } from "@/features/projects";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <SideNav />
      <MobileNav>
        <main className="flex-1">
          <HeroStage hero={<Hero />}>
            <div className="mx-auto flex max-w-2xl flex-col px-6 md:pl-22">
              <Section id="projects">
                <Projects />
              </Section>
              {(["videos", "toolbox", "guestbook"] as const).map((id) => (
                <Section key={id} id={id}>
                  <p className="text-muted-foreground">{t("Placeholder")}</p>
                </Section>
              ))}
            </div>
          </HeroStage>
        </main>
      </MobileNav>
    </>
  );
}
