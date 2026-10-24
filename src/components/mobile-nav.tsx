"use client";

import { Dialog } from "@base-ui/react/dialog";
import { MenuIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { type ReactNode, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { introDelay } from "@/constants/intro";
import { sections } from "@/constants/sections";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/utils";
import { IntroReveal } from "./intro-reveal";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

// iOS sheet curve; shared by the menu and the page so they move as one surface
const push =
  "transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-opacity motion-reduce:duration-200";

// Full-screen menu that slides in from the left and pushes the page out to the right
export function MobileNav({ children }: { children: ReactNode }) {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const target = useRef<string | null>(null);
  const active = useActiveSection(sections);

  const scrollToTarget = (isOpen: boolean) => {
    if (isOpen || !target.current) return;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(target.current)
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    target.current = null;
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={scrollToTarget}
    >
      <IntroReveal delay={introDelay.nav}>
        <Dialog.Trigger
          render={
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label={t("open")}
              className="fixed top-4 left-4 z-20 md:hidden"
            />
          }
        >
          <MenuIcon />
        </Dialog.Trigger>
      </IntroReveal>

      <Dialog.Portal>
        <Dialog.Popup
          className={cn(
            "fixed inset-0 z-30 flex flex-col bg-background px-4 pt-4 pb-8 outline-none data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full motion-reduce:data-[ending-style]:translate-x-0 motion-reduce:data-[ending-style]:opacity-0 motion-reduce:data-[starting-style]:translate-x-0 motion-reduce:data-[starting-style]:opacity-0 md:hidden",
            push,
          )}
        >
          <Dialog.Title className="sr-only">{t("label")}</Dialog.Title>
          <Dialog.Close
            render={
              <Button variant="ghost" size="icon-lg" aria-label={t("close")} />
            }
          >
            <XIcon />
          </Dialog.Close>

          <nav
            aria-label={t("label")}
            className="flex flex-1 items-center px-6"
          >
            <ul className="flex flex-col gap-6">
              {sections.map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    aria-current={active === section ? "location" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      target.current = section;
                      setOpen(false);
                    }}
                    className={cn(
                      "relative font-serif text-3xl font-light tracking-[0.2em] outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline focus-visible:decoration-ctp-yellow focus-visible:underline-offset-8 [&:lang(en)]:tracking-normal",
                      active === section
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {active === section && (
                      <span className="absolute top-1/2 -left-6 h-px w-3 bg-ctp-yellow" />
                    )}
                    {t(section)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 px-4">
            <LocaleSwitch label={t("switchLocale")} side="top" />
            <ThemeToggle label={t("toggleTheme")} />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>

      {/* clip, not hidden: stops the pushed page from widening the mobile viewport without breaking sticky */}
      <div className="flex flex-1 flex-col overflow-x-clip">
        <div
          className={cn(
            "flex flex-1 flex-col",
            push,
            open && "translate-x-full motion-reduce:translate-x-0",
          )}
        >
          {children}
        </div>
      </div>
    </Dialog.Root>
  );
}
