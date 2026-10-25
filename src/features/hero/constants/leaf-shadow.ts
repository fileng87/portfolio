// All coordinates are on a 1440×900 canvas anchored to the top-right corner

// Bamboo leaf silhouette: long, narrow and pointed, along +x from its stem at
// the origin, with the tip curving toward +y (droops once rotated into place)
export const leafPath = "M0 0C18-7 66-9 118 12C64 3 20 5 0 0Z";

// Culms (stalks), drawn top to bottom. `x` is where the culm crosses y=0,
// `lean` how far it drifts sideways by the bottom edge.
export const culmSpecs = [
  { x: 1395, lean: -40, width: 26, nodeGap: 170, firstNode: 60 },
  { x: 1268, lean: 30, width: 17, nodeGap: 150, firstNode: 110 },
];

// Twigs growing out of a culm's node (`culm` indexes culmSpecs). They start
// pointing up and to the left (angle in radians, SVG y points down), then
// arch over and droop.
export const branchSpecs = [
  { culm: 0, seed: 11, x: 1381, y: 330, angle: 3.75, length: 680 },
  { culm: 0, seed: 29, x: 1373, y: 500, angle: 3.5, length: 540 },
  { culm: 1, seed: 47, x: 1277, y: 260, angle: 3.95, length: 500 },
];

// Wind: culms sway gently about their base, twigs more about their node.
// Amplitudes in degrees, periods in seconds.
export const sway = {
  culm: { amplitude: 0.6, period: 11 },
  twig: { amplitude: 2.5, period: [7, 8.5, 6] },
};
