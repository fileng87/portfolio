import { useTranslations } from "next-intl";
import { PageCorners } from "@/components/page-corners";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <>
      <PageCorners />
      <main className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 text-center">
        <p
          aria-hidden
          className="font-serif text-7xl font-light tracking-[-0.02em] sm:text-8xl"
        >
          404
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-2xl font-light tracking-[0.1em]">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          {t("back")}
        </Link>
      </main>
    </>
  );
}
