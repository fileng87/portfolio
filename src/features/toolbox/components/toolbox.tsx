import { CodeXmlIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { RevealItem, RevealList } from "@/components/reveal";
import { Subsection } from "@/components/section";
import { toolbox } from "../constants/toolbox";

export function Toolbox() {
  const t = useTranslations("Toolbox");

  return (
    <div className="flex flex-col gap-20">
      {(["stack", "tools"] as const).map((group) => (
        <Subsection key={group} title={t(group)}>
          <RevealList className="grid grid-cols-2 gap-x-6 border-t sm:grid-cols-3 lg:grid-cols-4">
            {toolbox[group].map((tool) => (
              <RevealItem
                key={tool.title}
                className="flex items-center gap-3 border-b py-4 text-sm"
              >
                {tool.path ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4 shrink-0 fill-current"
                    style={{ color: tool.hex && `#${tool.hex}` }}
                  >
                    <path d={tool.path} />
                  </svg>
                ) : (
                  <CodeXmlIcon
                    aria-hidden
                    strokeWidth={1.75}
                    className="size-4 shrink-0"
                    style={{ color: tool.hex && `#${tool.hex}` }}
                  />
                )}
                {tool.title}
              </RevealItem>
            ))}
          </RevealList>
        </Subsection>
      ))}
    </div>
  );
}
