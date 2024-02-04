import { dirname, join, resolve } from "path";

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}

const config = {
    stories: ["../stories/*.stories.tsx", "../stories/**/*.stories.tsx"],
    addons: [
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-docs"),
    ],
    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {},
    },

    core: {},

    async viteFinal(config, { configType }) {
        // customize the Vite config here
        return {
            ...config,
            define: { "process.env": {} },
            resolve: {
                alias: [
                    {
                        find: "ui",
                        replacement: resolve(__dirname, "../../../packages/ui/"),
                    },
                    {
                        find: "@ui",
                        replacement: resolve("../../packages/ui/src"),
                    },
                    {
                        find: "@dist",
                        replacement: resolve("../../packages/ui/dist"),
                    },
                    {
                        find: /#/,
                        replacement: `${resolve("../../packages/ui/src")}/`,
                    },
                    {
                        find: "@icon",
                        replacement: resolve("../../packages/icon/dist"),
                    },
                ],
            },
        };
    },

    docs: {
        autodocs: true,
    },
};

export default config;
