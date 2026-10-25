import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { sections } from "@/constants/sections";
import { cn } from "@/utils";
import { Reveal } from "./reveal";

// A page section, titled with its nav label so the two never drift apart.
// Read like chapters: the title rises into view, then its content follows
// (see Reveal); scrolled past, it fades out under the top edge
// (`scroll-edge` in globals.css).
// `centered` makes it a full-screen chapter with everything in the middle.
export function Section({
  id,
  centered = false,
  children,
}: {
  id: (typeof sections)[number];
  centered?: boolean;
  children: ReactNode;
}) {
  const t = useTranslations("Nav");

  return (
    <section
      id={id}
      className={cn(
        "py-24",
        // Jumped to, a full-screen chapter fills the screen; others land with
        // their title (below 6rem of padding) 1rem under the top edge's fade
        centered
          ? "flex min-h-svh flex-col justify-center"
          : "min-h-[60svh] scroll-mt-[calc(var(--scroll-edge)-5rem)]",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-10",
          centered && "items-center text-center",
        )}
      >
        <Reveal>
          <h2 className="font-serif text-2xl font-light tracking-[0.1em]">
            {t(id)}
          </h2>
        </Reveal>
        {children}
      </div>
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
