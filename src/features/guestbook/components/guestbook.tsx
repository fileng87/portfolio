import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { env } from "@/lib/env";
import { GiscusFrame } from "./giscus-frame";

export function Guestbook() {
  const t = useTranslations("Guestbook");
  const { GISCUS_REPO: repo, GISCUS_REPO_ID: repoId } = env;
  const discussion = env.GISCUS_DISCUSSION;

  return (
    <div className="flex flex-col gap-10">
      <Reveal>
        <p className="text-muted-foreground">{t("intro")}</p>
      </Reveal>
      <Reveal delay={0.15}>
        {repo && repoId && discussion ? (
          <GiscusFrame
            repo={repo as `${string}/${string}`}
            repoId={repoId}
            discussion={discussion}
          />
        ) : (
          <p className="text-muted-foreground">{t("unavailable")}</p>
        )}
      </Reveal>
    </div>
  );
}
