import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getRepos } from "../api/repos";

// "https://www.example.com/path" → "example.com/path"
const displayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export async function Projects() {
  const t = await getTranslations("Projects");
  const repos = await getRepos();

  if (repos.length === 0) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }

  return (
    <ul className="divide-y border-y">
      {repos.map((repo) => (
        <li key={repo.url} className="group relative py-7">
          <div className="flex items-baseline justify-between gap-6">
            <h4 className="font-serif text-xl font-light">
              {/* Stretched over the whole row; the homepage link sits above it */}
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-baseline gap-1.5 underline-offset-[0.3em] outline-none decoration-ctp-yellow after:absolute after:inset-0 after:rounded-sm group-hover:underline focus-visible:underline focus-visible:after:ring-2 focus-visible:after:ring-ring"
              >
                {repo.name}
                <ArrowUpRightIcon
                  strokeWidth={1.25}
                  className="size-4 -translate-x-1 self-center text-muted-foreground opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
                />
              </a>
            </h4>
            {repo.stargazerCount > 0 && (
              <span
                className="flex shrink-0 items-center gap-1 font-mono text-xs text-muted-foreground tabular-nums"
                title={t("stars", { count: repo.stargazerCount })}
              >
                <StarIcon strokeWidth={1.5} className="size-3" aria-hidden />
                <span className="sr-only">
                  {t("stars", { count: repo.stargazerCount })}
                </span>
                <span aria-hidden>{repo.stargazerCount}</span>
              </span>
            )}
          </div>

          {repo.description && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {repo.description}
            </p>
          )}

          {(repo.primaryLanguage || repo.homepageUrl) && (
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              {repo.primaryLanguage && (
                <span className="flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: repo.primaryLanguage.color }}
                  />
                  {repo.primaryLanguage.name}
                </span>
              )}
              {repo.homepageUrl && (
                <a
                  href={repo.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 rounded-sm underline-offset-4 outline-none transition-colors duration-300 hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {displayUrl(repo.homepageUrl)}
                </a>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
