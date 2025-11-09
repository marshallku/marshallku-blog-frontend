const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const reactRefreshPlugin = require("eslint-plugin-react-refresh");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const testingLibraryPlugin = require("eslint-plugin-testing-library");
const tanstackQueryPlugin = require("@tanstack/eslint-plugin-query");
const prettierConfig = require("eslint-config-prettier");
const baseConfig = require("./base");

/**
 * React ESLint configuration
 * Extends base config with React-specific rules
 */
module.exports = [
    ...baseConfig,

    // React and JSX configuration
    {
        files: ["**/*.jsx", "**/*.tsx"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                JSX: "readonly",
                React: "readonly",
            },
        },
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "react-refresh": reactRefreshPlugin,
            "jsx-a11y": jsxA11yPlugin,
            "@tanstack/query": tanstackQueryPlugin,
        },
        settings: {
            react: {
                version: "detect",
            },
            "jsx-a11y": {
                polymorphicPropName: "as",
                components: {
                    Image: "img",
                },
            },
        },
        rules: {
            // React Core Rules
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs["jsx-runtime"].rules,
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",
            "react/no-unknown-property": "off",
            "react/display-name": "off",

            // React Hooks Rules
            ...reactHooksPlugin.configs.recommended.rules,

            // React Refresh Rules
            "react-refresh/only-export-components": [
                "warn",
                {
                    allowConstantExport: true,
                    allowExportNames: [
                        "metadata",
                        "viewport",
                        "dynamic",
                        "generateMetadata",
                        "generateStaticParams",
                        "loader",
                        "action",
                    ],
                },
            ],

            // JSX Accessibility Rules
            "jsx-a11y/alt-text": [
                "warn",
                {
                    elements: ["img"],
                },
            ],
            "jsx-a11y/aria-props": "warn",
            "jsx-a11y/aria-proptypes": "warn",
            "jsx-a11y/aria-unsupported-elements": "warn",
            "jsx-a11y/role-has-required-aria-props": "warn",
            "jsx-a11y/role-supports-aria-props": "warn",
            "jsx-a11y/no-static-element-interactions": "warn",

            // TanStack Query Rules
            ...tanstackQueryPlugin.configs.recommended.rules,

            // TypeScript overrides for React
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                    // Ignore unused vars in React component props
                    ignoreRestSiblings: true,
                },
            ],
        },
    },

    // Test files configuration
    {
        files: [
            "**/__tests__/**/*.[jt]s?(x)",
            "**/?(*.)+(spec|test).[jt]s?(x)",
        ],
        plugins: {
            "testing-library": testingLibraryPlugin,
        },
        rules: {
            ...testingLibraryPlugin.configs.react.rules,
            "react-refresh/only-export-components": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
    },

    // Prettier config (must be last to override other formatting rules)
    prettierConfig,
];
