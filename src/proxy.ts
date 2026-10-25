import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip `/api`, `/_next`, `/_vercel` and files with an extension
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
