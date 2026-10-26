// Procedural bamboo-shadow stand-in for a photo overlay; swap for an image asset later.
import type { CSSProperties } from "react";
import {
  branchSpecs,
  culmSpecs,
  leafPath,
  sway,
} from "../constants/bamboo-shadow";

// Deterministic PRNG so server and client render the same branches
function random(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Leaf = { x: number; y: number; angle: number; scale: number };

const toDeg = (rad: number) => (rad * 180) / Math.PI;

// A bamboo twig: a thin stem that rises, then arches and droops, with a fan of
// four to six long leaves hanging from each node.
function branch(
  seed: number,
  x0: number,
  y0: number,
  angle: number,
  length: number,
) {
  const rand = random(seed);
  const leaves: Leaf[] = [];
  const points: string[] = [];
  let x = x0;
  let y = y0;
  let heading = angle;

  for (let d = 0; d <= length; d += 10) {
    // Gravity pulls the heading toward straight down, so a twig that starts
    // upward arches over and droops
    heading += (Math.PI / 2 - heading) * 0.019;
    x += Math.cos(heading) * 10;
    y += Math.sin(heading) * 10;
    points.push(`${x.toFixed(1)} ${y.toFixed(1)}`);

    // A node roughly every 70–100 units, after a short bare stretch
    if (d > 60 && d % 80 < 10 && rand() > 0.15) {
      const count = 4 + Math.floor(rand() * 3);
      // Leaves hang between the stem's direction and straight down
      const hang = toDeg(heading) * 0.25 + 90 * 0.75;
      for (let k = 0; k < count; k++) {
        leaves.push({
          x,
          y,
          angle: hang + (k - (count - 1) / 2) * 22 + (rand() - 0.5) * 14,
          scale: 0.75 + rand() * 0.5,
        });
      }
    }
  }

  return { path: `M${x0} ${y0}L${points.join("L")}`, leaves };
}

const branches = branchSpecs.map((b) => ({
  culm: b.culm,
  // Pivot where the twig meets its culm
  pivot: { x: b.x, y: b.y },
  ...branch(b.seed, b.x, b.y, b.angle, b.length),
}));

// Rotates a group back and forth about a point in canvas units
// (see `animate-sway` in globals.css)
function swayStyle(
  pivot: { x: number; y: number },
  amplitude: number,
  period: number,
  delay: number,
): CSSProperties {
  return {
    transformBox: "view-box",
    transformOrigin: `${pivot.x}px ${pivot.y}px`,
    ["--sway" as string]: `${amplitude}deg`,
    animationDuration: `${period}s`,
    animationDelay: `-${delay}s`,
  };
}

// A culm: straight segments separated by small gaps at each node, plus a
// slightly wider ring there, which reads as the joint once blurred.
function culm({ x, lean, nodeGap, firstNode }: (typeof culmSpecs)[number]) {
  const xAt = (y: number) => x + (lean * y) / 900;
  const nodes: number[] = [];
  for (let y = firstNode; y < 940; y += nodeGap) nodes.push(y);
  const bounds = [-40, ...nodes, 940];
  const segments = bounds.slice(1).map((end, i) => {
    const start = bounds[i] + 2;
    return `M${xAt(start)} ${start}L${xAt(end - 2)} ${end - 2}`;
  });
  return { segments, nodes: nodes.map((y) => ({ x: xAt(y), y })) };
}

const culms = culmSpecs.map((c) => ({
  width: c.width,
  // Pivot at the base, where the culm leaves the bottom edge
  pivot: { x: c.x + c.lean * (940 / 900), y: 940 },
  ...culm(c),
}));

// Each culm sways about its base and carries its twigs with it; each twig
// also sways about its own node. `phase` offsets the whole cycle, so the
// blurred copy doesn't move in lockstep with the sharp one.
function Bamboo({ phase = 0 }: { phase?: number }) {
  return culms.map((c, ci) => (
    <g
      key={c.segments[0]}
      className="motion-safe:animate-sway"
      style={swayStyle(
        c.pivot,
        sway.culm.amplitude,
        sway.culm.period,
        phase + ci * 3,
      )}
    >
      {c.segments.map((d) => (
        <path key={d} d={d} stroke="currentColor" strokeWidth={c.width} />
      ))}
      {c.nodes.map((n) => (
        <path
          key={n.y}
          d={`M${n.x - c.width / 2 - 3} ${n.y}h${c.width + 6}`}
          stroke="currentColor"
          strokeWidth={3}
        />
      ))}
      {branches.map(
        (b, bi) =>
          b.culm === ci && (
            <g
              key={b.path}
              className="motion-safe:animate-sway"
              style={swayStyle(
                b.pivot,
                sway.twig.amplitude,
                sway.twig.period[bi % sway.twig.period.length],
                phase + bi * 2.3,
              )}
            >
              <path
                d={b.path}
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
              />
              {b.leaves.map((leaf, i) => (
                <path
                  // biome-ignore lint/suspicious/noArrayIndexKey: leaves in a cluster share a position and never reorder
                  key={i}
                  d={leafPath}
                  fill="currentColor"
                  // Mirror leaves pointing left so their curved tips still droop
                  transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.angle}) scale(${leaf.scale} ${Math.cos((leaf.angle * Math.PI) / 180) < 0 ? -leaf.scale : leaf.scale})`}
                />
              ))}
            </g>
          ),
      )}
    </g>
  ));
}

// On phones the canvas shifts right (max-md:translate-x), keeping the culms
// near the edge and clear of the text. The SVGs draw past their own box
// (overflow-visible), so the shift doesn't cut the leaves off at its left
// edge; the hero stage clips them to the screen instead.
export function BambooShadow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 max-md:translate-x-[10%]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMaxYMin slice"
        className="absolute inset-0 size-full overflow-visible text-foreground opacity-[0.07] blur-[6px] dark:opacity-[0.05]"
      >
        <Bamboo />
      </svg>
      {/* A second, softer copy reads as leaves further from the wall */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMaxYMin slice"
        className="absolute inset-0 size-full overflow-visible text-foreground opacity-[0.05] blur-[14px] dark:opacity-[0.03]"
      >
        <Bamboo phase={1.7} />
      </svg>
    </div>
  );
}
