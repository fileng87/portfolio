import "server-only";
import { cacheLife } from "next/cache";
import { z } from "zod";
import { env } from "@/lib/env";

const fields = `
  name
  description
  url
  homepageUrl
  stargazerCount
  primaryLanguage { name color }
`;

// One aliased lookup per repo, so the list costs a single request
const buildQuery = (repos: string[]) =>
  `{${repos
    .map((full, i) => {
      const [owner, name] = full.split("/");
      return `r${i}: repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(name)}) {${fields}}`;
    })
    .join("\n")}}`;

const repo = z.object({
  name: z.string(),
  description: z.string().nullable(),
  url: z.url(),
  // GitHub returns "" as well as null when no homepage is set
  homepageUrl: z
    .string()
    .nullable()
    .transform((v) => v || null),
  stargazerCount: z.number(),
  primaryLanguage: z.object({ name: z.string(), color: z.string() }).nullable(),
});

// A repo that doesn't exist (or is private) comes back null
const response = z.object({
  data: z.record(z.string(), repo.nullable()),
});

export type Repo = z.infer<typeof repo>;

// The repos listed in GITHUB_REPOS, in the same order
export async function getRepos(): Promise<Repo[]> {
  "use cache";
  cacheLife("hours");

  if (env.GITHUB_REPOS.length === 0 || !env.GITHUB_TOKEN) return [];

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${env.GITHUB_TOKEN}` },
      body: JSON.stringify({ query: buildQuery(env.GITHUB_REPOS) }),
    });
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    const { data } = response.parse(await res.json());
    return env.GITHUB_REPOS.flatMap((full, i) => {
      const found = data[`r${i}`];
      if (!found) console.error(`Repo not found: ${full}`);
      return found ? [found] : [];
    });
  } catch (error) {
    // Render the section without the list rather than failing the page
    console.error("Failed to fetch repos:", error);
    return [];
  }
}
