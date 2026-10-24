import "server-only";
import { createHash } from "node:crypto";
import { env } from "@/lib/env";

// d=404 makes Gravatar fail when no image exists, so AvatarFallback shows instead
export function getGravatarUrl(size: number) {
  if (!env.GRAVATAR_EMAIL) return undefined;
  const hash = createHash("sha256")
    .update(env.GRAVATAR_EMAIL.trim().toLowerCase())
    .digest("hex");
  return `https://gravatar.com/avatar/${hash}?s=${size}&d=404`;
}
