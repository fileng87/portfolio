"use client";

import { LanguagesIcon } from "lucide-react";
import { type Locale, useLocale } from "next-intl";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeNames } from "@/constants/locales";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitch({
  label,
  side = "right",
}: {
  label: string;
  side?: "right" | "top";
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  // Switching locale re-renders the page; doing it mid-close leaves the menu
  // stuck in its exit animation, so navigate only once it has fully closed
  const [open, setOpen] = useState(false);
  const pending = useRef<Locale | null>(null);

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(isOpen) => {
        if (isOpen || !pending.current) return;
        router.replace(pathname, { locale: pending.current });
        pending.current = null;
      }}
    >
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" aria-label={label} />}
      >
        <LanguagesIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side} align="end" className="w-auto">
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(value: Locale) => {
            pending.current = value;
            setOpen(false);
          }}
        >
          {routing.locales.map((l) => (
            <DropdownMenuRadioItem key={l} value={l} lang={l} closeOnClick>
              {localeNames[l]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
