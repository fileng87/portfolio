// Who the site belongs to. Forking it? Start here.

import { type SimpleIcon, siGithub, siX, siYoutube } from "simple-icons";

export const name = "ZyraX";

// Brand tagline, identical in every locale; each entry is one line
export const tagline = ["Just Coding", "for Fun"];
// Word in the tagline that gets the highlighter stroke
export const taglineEmphasis = "Fun";

// Where clicking the hero avatar leads (an easter egg)
export const avatarLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

// Shown under About, in this order. Icons come from Simple Icons.
export const socials: { icon: SimpleIcon; href: string }[] = [
  { icon: siGithub, href: "https://github.com/fileng87" },
  { icon: siX, href: "https://x.com/fileng87" },
  {
    icon: siYoutube,
    href: "https://www.youtube.com/channel/UC-4_DC84v16kkJHEiqFQa0w",
  },
];
