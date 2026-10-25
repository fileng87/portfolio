import {
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
// Icons show in their brand color; black brands drop `hex` and use the text
// color instead, so they stay visible in dark mode.
export const toolbox: Record<"stack" | "tools", Tool[]> = {
  stack: [
    siTypescript,
    siReact,
    { ...siNextdotjs, hex: undefined },
    siTailwindcss,
    siVite,
    siNodedotjs,
    { ...siExpress, hex: undefined },
    siFastapi,
    siPostgresql,
    siMongodb,
    siRedis,
    { ...siRust, hex: undefined },
    siDotnet,
    { ...siModelcontextprotocol, title: "MCP", hex: undefined },
  ],
  tools: [
    siGit,
    { ...siGithub, hex: undefined },
    siDocker,
    siLinux,
    { title: "VS Code", hex: "007ACC" },
    siClaude,
    { title: "Codex" },
    siPostman,
  ],
};
