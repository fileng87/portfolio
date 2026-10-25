import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { sections } from "@/constants/sections";
import { Reveal } from "./reveal";
import { SectionExit } from "./section-exit";

// A page section, titled with its nav label so the two never drift apart.
// Read like chapters: the title rises into view, then its content follows
// (see Reveal); scrolled past, it fades away for the next.
export function Section({
  id,
  children,
}: {
  id: (typeof sections)[number];
  children: ReactNode;
}) {
  const t = useTranslations("Nav");

  return (
    <section id={id} className="min-h-[60svh] scroll-mt-8 py-24">
      <SectionExit className="flex flex-col gap-10">
        <Reveal>
          <h2 className="font-serif text-2xl font-light tracking-[0.1em]">
            {t(id)}
          </h2>
        </Reveal>
        {children}
      </SectionExit>
    </section>
  );
}

// A titled group within a section
export function Subsection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8">
      <Reveal>
        <h3 className="text-sm tracking-[0.2em] text-muted-foreground">
          {title}
        </h3>
      </Reveal>
      {children}
    </div>
  );
}
