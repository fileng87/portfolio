import {
  siBiome,
  siClaude,
  siDocker,
  siDotnet,
  siExpress,
  siFastapi,
  siGit,
  siGithub,
  siLinux,
  siModelcontextprotocol,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siProxmox,
  siReact,
  siRedis,
  siRust,
  siTailwindcss,
  siTypescript,
  siVite,
} from "simple-icons";
import type { Tool } from "../types/tool";

// Brand icons come from Simple Icons (https://simpleicons.org), imported by
// name as `si<Name>`. Brands it doesn't carry (e.g. Microsoft's) are written
// as `{ title }` and get a generic icon (Microsoft's and OpenAI's are gone).
export const toolbox: Record<"stack" | "tools", Tool[]> = {
  stack: [
    siTypescript,
    siReact,
    siNextdotjs,
    siTailwindcss,
    siVite,
    siNodedotjs,
    siExpress,
    siFastapi,
    siPostgresql,
    siMongodb,
    siRedis,
    siRust,
    siDotnet,
    { ...siModelcontextprotocol, title: "MCP" },
  ],
  tools: [
    siGit,
    siGithub,
    siBiome,
    siDocker,
    siLinux,
    siProxmox,
    { title: "VS Code" },
    siClaude,
    { title: "Codex" },
    siPostman,
  ],
};
