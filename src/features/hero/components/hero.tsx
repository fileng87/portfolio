import { ArrowDownIcon } from "lucide-react";
import { getImageProps } from "next/image";
import { useTranslations } from "next-intl";
import { preload } from "react-dom";
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
  // Served through next/image, resized to the rendered size (size-40 /
  // sm:size-56 / lg:size-80) and cached on our own origin
  const avatar =
    avatarUrl &&
    getImageProps({
      src: avatarUrl,
      alt: name,
      width: 320,
      height: 320,
      sizes: "(min-width: 1024px) 320px, (min-width: 640px) 224px, 160px",
    }).props;
  // The avatar only mounts once the tagline has typed out; fetching it now
  // means it's usually ready by then
  if (avatar) {
    preload(avatar.src, {
      as: "image",
      imageSrcSet: avatar.srcSet,
      imageSizes: avatar.sizes,
    });
  }

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
            {/* A plain muted square holds the place while loading; the
                image fades in over it, and the initial only shows if the
                image fails or is still slow after the delay */}
            <Avatar className="size-40 rounded-none bg-muted after:rounded-none sm:size-56 lg:size-80">
              {avatar && (
                <AvatarImage
                  {...avatar}
                  className="rounded-none transition-opacity duration-700 ease-out data-starting-style:opacity-0 motion-reduce:transition-none"
                />
              )}
              <AvatarFallback
                delay={avatar ? 1500 : 0}
                className="rounded-none font-serif text-5xl font-light"
              >
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
