import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { sections } from "@/constants/sections";

// A page section, titled with its nav label so the two never drift apart
export function Section({
  id,
  children,
}: {
  id: (typeof sections)[number];
  children: ReactNode;
}) {
  const t = useTranslations("Nav");

  return (
    <section
      id={id}
      className="flex min-h-[60svh] scroll-mt-8 flex-col gap-10 py-24"
    >
      <h2 className="font-serif text-2xl font-light tracking-[0.1em]">
        {t(id)}
      </h2>
      {children}
    </section>
  );
}
