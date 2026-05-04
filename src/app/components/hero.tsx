import { Gravatar } from "@/components/gravatar";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="h-screen w-screen relative" id="hero">
      <div
        className={cn(
          "absolute top-1/2 left-1/2",
          "-translate-x-1/2 -translate-y-1/2",
          "flex flex-wrap items-center justify-center",
          "gap-x-24 gap-y-10",
        )}
      >
        <Gravatar className="w-48 h-48" />
        <h1 className="text-5xl font-bold text-center">Just code for fun.</h1>
      </div>
    </section>
  );
}
