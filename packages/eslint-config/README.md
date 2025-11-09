# @marshallku/eslint-config

Shared ESLint configuration for the marshallku monorepo using ESLint 9+ flat config format.

## Features

- ✅ ESLint 9+ flat config format
- ✅ TypeScript support with typescript-eslint
- ✅ React 19 support
- ✅ Next.js 15+ App Router support
- ✅ Storybook support
- ✅ TanStack Query rules
- ✅ Accessibility rules (jsx-a11y)
- ✅ Testing Library rules
- ✅ Import sorting and organization
- ✅ Prettier integration

## Installation

```bash
pnpm add -D @marshallku/eslint-config eslint@^9 typescript@^5
```

## Usage

### Base Configuration (TypeScript)

For TypeScript projects without React:

```js
// eslint.config.js
const baseConfig = require("@marshallku/eslint-config");

module.exports = baseConfig;
```

### React Configuration

For React projects:

```js
// eslint.config.js
const reactConfig = require("@marshallku/eslint-config/react");

module.exports = reactConfig;
```

### Next.js Configuration

For Next.js projects (recommended for apps/blog):

```js
// eslint.config.js
const nextConfig = require("@marshallku/eslint-config/next");

module.exports = nextConfig;
```

### Storybook Configuration

For Storybook projects (recommended for apps/docs):

```js
// eslint.config.js
const storybookConfig = require("@marshallku/eslint-config/storybook");

module.exports = storybookConfig;
```

### Custom Configuration

You can extend and customize the configuration:

```js
// eslint.config.js
const tseslint = require("typescript-eslint");
const nextConfig = require("@marshallku/eslint-config/next");

module.exports = tseslint.config(
    ...nextConfig,
    {
        // Your custom rules
        rules: {
            "no-console": "off",
        },
    }
);
```

## Available Configurations

- `@marshallku/eslint-config` - Base TypeScript configuration
- `@marshallku/eslint-config/base` - Explicit base configuration
- `@marshallku/eslint-config/react` - React configuration
- `@marshallku/eslint-config/next` - Next.js configuration
- `@marshallku/eslint-config/storybook` - Storybook configuration

## Rules Overview

### Base Rules

- TypeScript strict mode with recommended rules
- Consistent type imports
- No unused variables (with underscore prefix allowance)
- Import ordering and organization
- Unicorn plugin for code quality
- No relative import paths enforcement

### React Rules

- React 19 support with JSX runtime
- React Hooks rules
- React Refresh for HMR
- JSX accessibility (a11y) rules
- TanStack Query best practices
- Testing Library rules for test files

### Next.js Rules

- Next.js recommended and core-web-vitals rules
- App Router specific configurations
- Pages Router support
- Middleware and instrumentation support
- Custom Image component allowances

### Storybook Rules

- Storybook recommended rules
- Story file specific configurations
- Main config file support

## Migration from ESLint 8

1. Update ESLint to version 9:
   ```bash
   pnpm add -D eslint@^9
   ```

2. Replace `.eslintrc.cjs` with `eslint.config.js`

3. Update the configuration format:
   ```js
   // Old (.eslintrc.cjs)
   module.exports = {
       extends: ["@marshallku/eslint-config"],
       // ...
   };

   // New (eslint.config.js)
   const config = require("@marshallku/eslint-config/next");
   module.exports = config;
   ```

4. Remove `@marshallku/eslint-config/patch` - it's no longer needed with flat config

5. Update your `package.json` lint script if needed:
   ```json
   {
       "scripts": {
           "lint": "eslint ."
       }
   }
   ```

## TypeScript Project Service

This configuration uses the new `projectService` option from typescript-eslint, which automatically detects your TypeScript configuration without needing to specify `project` paths. This works better in monorepos and eliminates the need for `tsconfigRootDir`.

## License

MIT
