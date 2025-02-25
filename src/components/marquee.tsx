'use client';

interface MarqueeProps {
  text: string;
  className?: string;
}

export function Marquee({ text, className }: MarqueeProps) {
  return (
    <div className="relative overflow-x-hidden">
      <div className="animate-marquee whitespace-nowrap py-20">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={`mx-8 text-9xl font-bold italic tracking-tight ${className} text-transparent [-webkit-text-stroke:3px_theme(colors.pink.300)] [text-shadow:5px_5px_0_theme(colors.pink.300/0.3)] dark:text-transparent dark:[-webkit-text-stroke:3px_theme(colors.cyan.500)] dark:[text-shadow:5px_5px_0_theme(colors.cyan.500/0.3)]`}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
