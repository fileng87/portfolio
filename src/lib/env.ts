import "server-only";
import { z } from "zod";

const schema = z.object({
  GRAVATAR_EMAIL: z.email().optional(),
  // Comma-separated "owner/name" list, e.g. "fileng87/portfolio,fileng87/sixseven"
  GITHUB_REPOS: z
    .string()
    .optional()
    .transform((v) =>
      (v ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    )
    .pipe(z.array(z.string().regex(/^[\w.-]+\/[\w.-]+$/))),
  GITHUB_TOKEN: z.string().min(1).optional(),
  YOUTUBE_CHANNEL_ID: z
    .string()
    .regex(/^UC[\w-]{22}$/)
    .optional(),
  // Video id (the "v" in youtube.com/watch?v=...) shown large first;
  // without one, the latest upload leads
  YOUTUBE_FEATURED_VIDEO: z
    .string()
    .regex(/^[\w-]{11}$/)
    .optional(),
  // Guestbook comments live in one GitHub Discussion (https://giscus.app)
  GISCUS_REPO: z
    .string()
    .regex(/^[\w.-]+\/[\w.-]+$/)
    .optional(),
  GISCUS_REPO_ID: z.string().min(1).optional(),
  GISCUS_DISCUSSION: z.coerce.number().int().positive().optional(),
});

export const env = schema.parse(process.env);
