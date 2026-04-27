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
    <div className="min-h-full p-6 my-auto max-h-4/5">
      <nav>
        <ul className="space-y-12">
          {items.map((item) => (
            <li key={item.href}>
              <SideNavItem {...item} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function SideNavItem(props: {
  name: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            nativeButton={false}
            size="icon-lg"
            variant="ghost"
            className="rounded-full"
            render={<Link href={props.href} aria-label={props.name} />}
          >
            {props.icon}
          </Button>
        }
      />
      <TooltipContent side="right">
        <p>{props.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
