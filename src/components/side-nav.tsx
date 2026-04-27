import { Code, Home, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function SideNav() {
  const items = [
    {
      name: "Home",
      href: "/",
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
    <nav className="min-h-full px-8 my-auto max-h-4/5">
      <ul className="flex flex-col gap-12">
        {items.map((item) => (
          <li key={item.href}>
            <SideNavItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
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
          <Button
            size="icon-lg"
            variant="ghost"
            className="rounded-full"
            render={<Link href={href} aria-label={name} />}
          >
            {icon}
          </Button>
        }
      />
      <TooltipContent side="right">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
