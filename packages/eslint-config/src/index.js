/**
 * @marshallku/eslint-config
 *
 * Shared ESLint configuration for the marshallku monorepo
 *
 * Usage:
 *
 * // Base TypeScript config (import in eslint.config.js)
 * const baseConfig = require("@marshallku/eslint-config");
 * module.exports = baseConfig;
 *
 * // React config
 * const reactConfig = require("@marshallku/eslint-config/react");
 * module.exports = reactConfig;
 *
 * // Next.js config
 * const nextConfig = require("@marshallku/eslint-config/next");
 * module.exports = nextConfig;
 *
 * // Storybook config
 * const storybookConfig = require("@marshallku/eslint-config/storybook");
 * module.exports = storybookConfig;
 */

module.exports = require("./base");
