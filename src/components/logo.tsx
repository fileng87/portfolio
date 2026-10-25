import { cn } from "@/utils";

// The Typing Z mark (brand/), small-size cut: meant for under 48px. The Z
// takes the text colour and the caret the yellow accent, so it follows the
// theme.
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
    >
      <path
        d="M3 3 L29 3 L29 9 L12.5 23 L17 23 L17 29 L3 29 L3 23 L19.5 9 L3 9 Z"
        fill="currentColor"
      />
      <path d="M21 18 L29 18 L29 29 L21 29 Z" className="fill-ctp-yellow" />
    </svg>
  );
}
