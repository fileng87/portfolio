"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // The theme script only needs to run in the server HTML. On client renders
      // (e.g. switching locale remounts the root layout) mark it non-executable so
      // React 19 doesn't warn about a <script> tag.
      scriptProps={
        typeof window === "undefined" ? undefined : { type: "text/plain" }
      }
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
