import { ArrowUpRightIcon, type LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

// Shown when a section's content can't be loaded (a service is down or not
// configured), pointing to where it lives instead
export function Unavailable({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { href: string; label: string };
}) {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action && (
        <EmptyContent>
          {/* A plain link styled as a button: rendering Button as an anchor
              gives it role="button", but this navigates */}
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            {action.label}
            <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </EmptyContent>
      )}
    </Empty>
  );
}
