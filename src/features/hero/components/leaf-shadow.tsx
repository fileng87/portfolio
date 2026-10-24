// Procedural stand-in for a leaf-shadow photo overlay; swap for an image asset later.
import { branchSpecs, leafPath } from "../constants/leaf-shadow";

// Deterministic PRNG so server and client render the same branches
function random(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Leaf = { x: number; y: number; angle: number; scale: number };

function branch(seed: number, x0: number, y0: number, angle: number) {
  const rand = random(seed);
  const leaves: Leaf[] = [];
  const length = 520 + rand() * 260;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  let bend = 0;

  for (let d = 30; d < length; d += 22 + rand() * 14) {
    bend += (rand() - 0.5) * 0.004;
    const x = x0 + dx * d - dy * bend * d * d * 0.05;
    const y = y0 + dy * d + dx * bend * d * d * 0.05;
    const side = leaves.length % 2 === 0 ? 1 : -1;
    leaves.push({
      x,
      y,
      angle: (angle * 180) / Math.PI + side * (35 + rand() * 30),
      scale: 0.9 + rand() * 0.9 - d / length / 3,
    });
  }
  return {
    path: `M${x0} ${y0}L${x0 + dx * length} ${y0 + dy * length}`,
    leaves,
  };
}

const branches = branchSpecs.map((b) => branch(b.seed, b.x, b.y, b.angle));

function Branches() {
  return branches.map((b) => (
    <g key={b.path}>
      <path d={b.path} stroke="currentColor" strokeWidth={3} fill="none" />
      {b.leaves.map((leaf) => (
        <path
          key={`${leaf.x}-${leaf.y}`}
          d={leafPath}
          fill="currentColor"
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.angle}) scale(${leaf.scale})`}
        />
      ))}
    </g>
  ));
}

export function LeafShadow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMaxYMin slice"
        className="absolute inset-0 size-full origin-top-right text-foreground opacity-[0.07] blur-[6px] will-change-transform motion-safe:animate-leaf-sway dark:opacity-[0.05]"
      >
        <Branches />
      </svg>
      {/* A second, softer copy reads as leaves further from the wall */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMaxYMin slice"
        className="absolute inset-0 size-full origin-top-right text-foreground opacity-[0.05] blur-[14px] will-change-transform motion-safe:animate-leaf-sway dark:opacity-[0.03]"
        style={{ animationDuration: "19s", animationDelay: "-6s" }}
      >
        <Branches />
      </svg>
    </div>
  );
}
