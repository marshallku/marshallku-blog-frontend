const storybookPlugin = require("eslint-plugin-storybook");
const reactConfig = require("./react");

/**
 * Storybook ESLint configuration
 * Extends React config with Storybook-specific rules
 */
module.exports = [
    ...reactConfig,

    // Storybook configuration
    {
        files: ["**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
        plugins: {
            storybook: storybookPlugin,
        },
        rules: {
            ...storybookPlugin.configs.recommended.overrides[0].rules,
            "react-refresh/only-export-components": "off",
            "import/no-default-export": "off",
            "storybook/no-uninstalled-addons": "off",
        },
    },

    // Storybook main config files
    {
        files: [".storybook/main.@(js|cjs|mjs|ts)"],
        rules: {
            "import/no-default-export": "off",
            "@typescript-eslint/no-require-imports": "off",
        },
    },
];
