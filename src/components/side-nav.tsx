import { Code, Home, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function SideNav() {
  const items = [
    {
      name: "Home",
      href: "/#hero",
      icon: <Home />,
    },
    {
      name: "About",
      href: "/#about",
      icon: <User />,
    },
    {
      name: "Projects",
      href: "/#projects",
      icon: <Code />,
    },
    {
      name: "Guestbook",
      href: "/#guestbook",
      icon: <MessageSquare />,
    },
  ];

  return (
    <aside className="relative">
      <nav className="fixed px-8 h-full flex items-center justify-center">
        <ul className="flex flex-col gap-12">
          {items.map((item) => (
            <li key={item.href}>
              <SideNavItem {...item} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

type SideNavItemProps = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

export function SideNavItem({ name, href, icon }: SideNavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon-lg",
              }),
              "rounded-full",
            )}
            href={href}
            aria-label={name}
          >
            {icon}
          </Link>
        }
      />
      <TooltipContent side="right">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
