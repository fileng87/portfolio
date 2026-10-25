import { useTranslations } from "next-intl";
import { MobileNav } from "@/components/mobile-nav";
import { Section, Subsection } from "@/components/section";
import { SideNav } from "@/components/side-nav";
import { Hero, HeroStage } from "@/features/hero";
import { Projects } from "@/features/projects";
import { Toolbox } from "@/features/toolbox";
import { Videos } from "@/features/videos";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <SideNav />
      <MobileNav>
        <main className="flex-1">
          <HeroStage hero={<Hero />}>
            <div className="mx-auto flex max-w-5xl flex-col px-6 md:pl-22">
              <Section id="projects">
                <div className="flex flex-col gap-20">
                  <Subsection title={t("Work.code")}>
                    <Projects />
                  </Subsection>
                  <Subsection title={t("Work.videos")}>
                    <Videos />
                  </Subsection>
                </div>
              </Section>
              <Section id="toolbox">
                <Toolbox />
              </Section>
              <Section id="guestbook">
                <p className="text-muted-foreground">{t("Placeholder")}</p>
              </Section>
            </div>
          </HeroStage>
        </main>
      </MobileNav>
    </>
  );
}
