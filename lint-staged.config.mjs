/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
const config = {
  // Run ESLint on JS/TS files
  '**/*': ['eslint --fix'],

  // Format with Prettier
  '**/*': 'prettier --write --ignore-unknown',
};

export default config;
