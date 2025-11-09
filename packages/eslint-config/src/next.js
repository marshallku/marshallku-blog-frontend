const nextPlugin = require("@next/eslint-plugin-next");
const reactConfig = require("./react");

/**
 * Next.js ESLint configuration
 * Extends React config with Next.js-specific rules
 */
module.exports = [
    ...reactConfig,

    // Next.js specific configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            "@next/next": nextPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,

            // Custom Next.js rules
            "@next/next/no-img-element": "off", // Allow img tag when using custom Image wrapper
            "@next/next/no-html-link-for-pages": "off",

            // Allow default exports for Next.js pages, layouts, etc.
            "import/no-default-export": "off",
        },
    },

    // App Router specific files
    {
        files: [
            "**/app/**/page.tsx",
            "**/app/**/layout.tsx",
            "**/app/**/loading.tsx",
            "**/app/**/error.tsx",
            "**/app/**/not-found.tsx",
            "**/app/**/template.tsx",
            "**/app/**/default.tsx",
            "**/app/global-error.tsx",
            "**/middleware.ts",
            "**/instrumentation.ts",
        ],
        rules: {
            "react-refresh/only-export-components": "off",
            "import/no-default-export": "off",
        },
    },

    // Pages Router specific files
    {
        files: [
            "**/pages/**/*.tsx",
            "**/pages/**/*.ts",
            "**/_app.tsx",
            "**/_document.tsx",
            "**/_error.tsx",
        ],
        rules: {
            "react-refresh/only-export-components": "off",
            "import/no-default-export": "off",
        },
    },

    // Next.js config files
    {
        files: ["next.config.js", "next.config.mjs", "next.config.ts"],
        rules: {
            "import/no-default-export": "off",
            "@typescript-eslint/no-require-imports": "off",
        },
    },
];
