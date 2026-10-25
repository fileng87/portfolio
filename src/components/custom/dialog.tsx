"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import { DialogOverlay, DialogPortal } from "@/components/ui/dialog";

// The shadcn DialogContent (components/ui/dialog.tsx), changed to:
// - take `overlayClassName` for the backdrop
// - always render the backdrop: the page sits inside MobileNav's
//   Dialog.Root, so every dialog counts as nested, and nested ones skip it
// - leave out the built-in close button
// Use the rest of the dialog parts from components/ui/dialog.
export function DialogContent({
  className,
  overlayClassName,
  ...props
}: DialogPrimitive.Popup.Props & { overlayClassName?: string }) {
  return (
    <DialogPortal>
      <DialogOverlay forceRender className={overlayClassName} />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 start-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        {...props}
      />
    </DialogPortal>
  );
}
