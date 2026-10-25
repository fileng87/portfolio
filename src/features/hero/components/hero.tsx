import { ArrowDownIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { IntroReveal } from "@/components/intro-reveal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { introDelay } from "@/constants/intro";
import { avatarLink, name, tagline, taglineEmphasis } from "@/constants/site";
import { getGravatarUrl } from "../api/gravatar";
import { HeroIntro } from "./hero-intro";

export function Hero() {
  const t = useTranslations("Hero");
  // 2x the largest rendered size (lg:size-80 = 320px) for sharp retina display
  const avatarUrl = getGravatarUrl(640);

  return (
    <>
      <HeroIntro
        tagline={tagline}
        emphasis={taglineEmphasis}
        name={name}
        avatar={
          // An easter egg: the avatar is a link, nothing says where to
          <a
            href={avatarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block outline-none transition-transform duration-300 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background active:scale-[0.98] motion-reduce:transition-none"
          >
            <Avatar className="size-40 rounded-none after:rounded-none sm:size-56 lg:size-80">
              {avatarUrl && (
                <AvatarImage
                  src={avatarUrl}
                  alt={name}
                  className="rounded-none"
                />
              )}
              <AvatarFallback className="rounded-none font-serif text-5xl font-light">
                {name[0]}
              </AvatarFallback>
            </Avatar>
          </a>
        }
      />

      <IntroReveal
        delay={introDelay.scrollHint}
        waitForHero
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          aria-label={t("scroll")}
          className="block rounded-full p-3 text-muted-foreground outline-none transition-colors duration-300 hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowDownIcon
            strokeWidth={1.25}
            className="size-5 motion-safe:animate-drift"
          />
        </a>
      </IntroReveal>
    </>
  );
}
