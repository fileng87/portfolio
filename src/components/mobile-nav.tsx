"use client";

import { Dialog } from "@base-ui/react/dialog";
import { MenuIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { introDelay } from "@/constants/intro";
import { home, navItems, sections } from "@/constants/sections";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/utils";
import { IntroReveal } from "./intro-reveal";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

// iOS sheet curve; shared by the menu and the page so they move as one surface
const push =
  "transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-opacity motion-reduce:duration-200";

// The menu icon spins into an X, like the theme toggle's icon swap
const iconMotion =
  "absolute inset-0 transition-[rotate,scale,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none";

function MenuToggleIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative size-4">
      <MenuIcon
        className={cn(iconMotion, open && "-rotate-90 scale-0 opacity-0")}
      />
      <XIcon
        className={cn(iconMotion, !open && "rotate-90 scale-0 opacity-0")}
      />
    </span>
  );
}

// Full-screen menu that slides in from the left and pushes the page out to the right
export function MobileNav({ children }: { children: ReactNode }) {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  // Above the first section, the top of the page is current
  const active = useActiveSection(sections) ?? home;

  // Closes the menu and scrolls to the section together; the page isn't
  // scroll-locked while the menu is open (modal="trap-focus")
  const goTo = (section: string) => {
    setOpen(false);
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(section)
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
      // Focus stays in the menu, but the trigger outside it remains clickable:
      // it sits above the menu and toggles it closed
      modal="trap-focus"
    >
      <IntroReveal delay={introDelay.nav}>
        <Dialog.Trigger
          render={
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label={t(open ? "close" : "open")}
              className="fixed top-4 left-4 z-40 md:hidden"
            />
          }
        >
          <MenuToggleIcon open={open} />
        </Dialog.Trigger>
      </IntroReveal>

      <Dialog.Portal>
        <Dialog.Popup
          className={cn(
            // touch-none: the page isn't scroll-locked behind the menu
            "fixed inset-0 z-30 flex touch-none flex-col bg-background px-4 pt-4 pb-8 outline-none data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full motion-reduce:data-[ending-style]:translate-x-0 motion-reduce:data-[ending-style]:opacity-0 motion-reduce:data-[starting-style]:translate-x-0 motion-reduce:data-[starting-style]:opacity-0 md:hidden",
            push,
          )}
        >
          <Dialog.Title className="sr-only">{t("label")}</Dialog.Title>
          {/* The visible close is the trigger above; this one lets touch
              screen readers leave the menu */}
          <Dialog.Close className="sr-only">{t("close")}</Dialog.Close>
          {/* Keeps the nav below the trigger's spot */}
          <div aria-hidden className="size-10" />

          <nav
            aria-label={t("label")}
            className="flex flex-1 items-center px-6"
          >
            <ul className="flex flex-col gap-6">
              {navItems.map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    aria-current={active === section ? "location" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(section);
                    }}
                    className={cn(
                      "relative font-serif text-3xl font-light tracking-[0.2em] outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline focus-visible:decoration-ctp-yellow focus-visible:underline-offset-8 [&:lang(en)]:tracking-normal",
                      active === section
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {t(section)}
                    {/* Underlines the current section's text, minus the
                        letter-spacing after its last character */}
                    {active === section && (
                      <motion.span
                        layoutId="mobile-section-indicator"
                        transition={{
                          type: "spring",
                          bounce: 0,
                          duration: 0.5,
                        }}
                        className="absolute right-[0.2em] -bottom-2 left-0 h-px bg-ctp-yellow [&:lang(en)]:right-0"
                      />
                    )}
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
