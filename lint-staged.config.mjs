/** @type {import('lint-staged').Configuration} */
const config = {
  "*": "biome check --write --no-errors-on-unmatched --files-ignore-unknown=true",
  "*.{ts,tsx}": "vitest related --run --passWithNoTests",
};

export default config;
