"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/utils";
import { typewriterTiming } from "../constants/typewriter";

const { delay, interval, jitter, pause } = typewriterTiming;

// Critically damped, matching the hero's layout spring
const spring = { type: "spring", bounce: 0, duration: 0.9 } as const;

// Zero-width and empty, so its bottom edge sits on the text baseline without
// shifting the line; the block itself is cap-height tall.
// The caret remounts on every keystroke, so the blink phase is pinned to a
// shared clock; otherwise it would restart and look solid while typing.
function Caret({
  trailing = false,
  synced,
}: {
  trailing?: boolean;
  synced: boolean;
}) {
  return (
    <span className="relative inline-block h-[0.72em] w-0">
      <span
        className={cn(
          "absolute bottom-0 h-full w-[0.42em] bg-ctp-yellow motion-safe:animate-caret",
          trailing ? "left-[0.1em]" : "left-[0.04em]",
        )}
        // Client-only (synced is false on the server render), so no hydration mismatch
        style={
          synced ? { animationDelay: `-${Date.now() % 1000}ms` } : undefined
        }
      />
    </span>
  );
}

// Types the lines out as one line. Untyped characters stay in the layout
// (invisible), so the line sits at its final position from the start.
// Once `wrap` is set, each line breaks onto its own row and the words glide
// to their new positions.
export function Typewriter({
  lines,
  wrap,
  skip = false,
  onComplete,
}: {
  lines: string[];
  wrap: boolean;
  // Start fully typed, without animating or calling onComplete
  skip?: boolean;
  onComplete?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const total = lines.join("").replaceAll(" ", "").length;
  const [typed, setTyped] = useState(skip ? total : 0);
  // Kept in a ref so a new callback identity doesn't restart typing
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (skip) return;
    if (reduceMotion) {
      setTyped(total);
      onCompleteRef.current?.();
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    let count = 0;
    const next = () => {
      count += 1;
      setTyped(count);
      timer =
        count < total
          ? setTimeout(next, interval + Math.random() * jitter)
          : setTimeout(() => onCompleteRef.current?.(), pause);
    };
    timer = setTimeout(next, delay);
    return () => clearTimeout(timer);
  }, [skip, reduceMotion, total]);

  // Block caret sits where the next character will appear, or after the last
  // one once done. It blinks throughout.
  const done = typed >= total;
  const caretAt = done ? total - 1 : typed;
  let index = 0;

  return (
    <>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden>
        {lines.map((line, row) => (
          <Fragment key={line}>
            {row > 0 && (wrap ? <br /> : " ")}
            {line.split(" ").map((word, w) => (
              <Fragment key={word}>
                {w > 0 && " "}
                <motion.span
                  layout="position"
                  transition={spring}
                  className="inline-block"
                >
                  {[...word].map((char) => {
                    const i = index++;
                    const caret = i === caretAt && !wrap;
                    return (
                      <Fragment key={i}>
                        {caret && !done && <Caret synced={typed > 0} />}
                        <span className={cn(i >= typed && "invisible")}>
                          {char}
                        </span>
                        {caret && done && <Caret trailing synced />}
                      </Fragment>
                    );
                  })}
                </motion.span>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </span>
    </>
  );
}
