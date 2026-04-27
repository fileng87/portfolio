import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function Gravatar({
  className,
  ...props
}: React.ComponentProps<typeof Avatar>) {
  const email = process.env.NEXT_PUBLIC_GRAVATAR_EMAIL;

  const image = email
    ? `https://www.gravatar.com/avatar/${btoa(email.trim().toLowerCase())}`
    : "https://media.tenor.com/x8v1oNUOmg4AAAAM/rickroll-roll.gif";

  return (
    <Avatar className={cn(className)} {...props}>
      <AvatarImage src={image} />
    </Avatar>
  );
}
