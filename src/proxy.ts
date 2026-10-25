import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip `/api`, `/_next`, `/_vercel`, files with an extension, and the share
  // image (the same for every locale, served from the root)
  matcher: "/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)",
};
