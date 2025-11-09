const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const globals = require("globals");
const importPlugin = require("eslint-plugin-import");
const unicornPlugin = require("eslint-plugin-unicorn");
const noRelativeImportPaths = require("eslint-plugin-no-relative-import-paths");

/**
 * Base ESLint configuration with TypeScript support
 * Uses ESLint 9+ flat config format
 */
module.exports = [
    // Global ignores
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "**/.next/**",
            "**/out/**",
            "**/.turbo/**",
            "**/coverage/**",
            "**/*.min.js",
            "**/*.config.js",
            "**/*.config.cjs",
            "**/*.config.mjs",
            "**/pnpm-lock.yaml",
            "**/package-lock.json",
            "**/yarn.lock",
        ],
    },

    // Base JavaScript configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
        },
        plugins: {
            import: importPlugin,
        },
        rules: {
            ...eslint.configs.recommended.rules,
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            eqeqeq: ["error", "always", { null: "ignore" }],
            "prefer-const": "error",
            "no-var": "error",
            "no-redeclare": "off",
        },
    },

    // TypeScript configuration
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module",
                projectService: true,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            import: importPlugin,
            unicorn: unicornPlugin,
            "no-relative-import-paths": noRelativeImportPaths,
        },
        rules: {
            ...eslint.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,

            // TypeScript-specific rules
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-non-null-assertion": "warn",
            "@typescript-eslint/consistent-type-imports": [
                "warn",
                {
                    prefer: "type-imports",
                    fixStyle: "inline-type-imports",
                },
            ],

            // Naming conventions
            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: "variable",
                    format: ["camelCase", "PascalCase", "UPPER_CASE"],
                    leadingUnderscore: "allow",
                },
                {
                    selector: "function",
                    format: ["camelCase", "PascalCase"],
                },
                {
                    selector: "typeLike",
                    format: ["PascalCase"],
                },
                {
                    selector: "interface",
                    format: ["PascalCase"],
                    custom: {
                        regex: "^I[A-Z]",
                        match: false,
                    },
                },
                {
                    selector: "typeAlias",
                    format: ["PascalCase"],
                },
                {
                    selector: "typeParameter",
                    format: ["PascalCase"],
                },
            ],

            // General code quality
            "no-console": ["warn", { allow: ["warn", "error"] }],
            eqeqeq: ["error", "always", { null: "ignore" }],
            "prefer-const": "error",
            "no-var": "error",

            // Import rules
            "import/no-default-export": "off",
            "import/order": [
                "warn",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        ["parent", "sibling"],
                        "index",
                        "object",
                        "type",
                    ],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],

            // Unicorn rules
            "unicorn/filename-case": "off",
            "unicorn/prevent-abbreviations": "off",
            "unicorn/no-null": "off",
        },
    },
];
