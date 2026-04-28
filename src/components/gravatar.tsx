import sha256 from "crypto-js/sha256";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function Gravatar({
  className,
  ...props
}: React.ComponentProps<typeof Avatar>) {
  const email = process.env.NEXT_PUBLIC_GRAVATAR_EMAIL;
  const fallbackImage =
    "https://media.tenor.com/x8v1oNUOmg4AAAAM/rickroll-roll.gif";

  const emailHash = sha256(email?.trim().toLowerCase() || "");
  const image = `https://www.gravatar.com/avatar/${emailHash}?s=512&d=${encodeURI(fallbackImage)}`;

  return (
    <Avatar className={cn(className)} {...props}>
      <AvatarImage src={image} />
    </Avatar>
  );
}
