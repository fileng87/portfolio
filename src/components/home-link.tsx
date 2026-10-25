import { useTranslations } from "next-intl";
import { home } from "@/constants/sections";
import { name } from "@/constants/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/utils";
import { Logo } from "./logo";

// The logo in the corner, linking back to the top of the home page. On the
// home page it jumps to the top; elsewhere (`page`) it navigates there.
export function HomeLink({
  page = false,
  className,
}: {
  page?: boolean;
  className?: string;
}) {
  const t = useTranslations("Nav");
  const props = {
    "aria-label": t("logo", { name }),
    className: cn(
      "flex size-10 items-center justify-center rounded-sm outline-none transition-transform duration-300 ease-out focus-visible:ring-2 focus-visible:ring-ring active:scale-95 motion-reduce:transition-none",
      className,
    ),
    children: <Logo className="size-6" />,
  };

  return page ? (
    <Link href="/" {...props} />
  ) : (
    <a href={`#${home}`} {...props} />
  );
}
