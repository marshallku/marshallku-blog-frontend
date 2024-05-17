import { dirname, join, resolve } from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const BLOG_SRC = resolve("../blog/src");

function getAbsolutePath<T extends string>(value: T): T {
    return dirname(require.resolve(join(value, "package.json"))) as T;
}

const config: StorybookConfig = {
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
    features: {},
    core: {},
    async viteFinal(config, { configType }) {
        const customConfig: typeof config = {
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
                        find: "@icon",
                        replacement: resolve("../../packages/icon/dist"),
                    },
                    {
                        find: "@blog",
                        replacement: resolve(BLOG_SRC, "components"),
                    },
                    {
                        find: /#/,
                        replacement: `${BLOG_SRC}/`,
                    },
                ],
            },
            css: {
                preprocessorOptions: {
                    scss: {
                        additionalData: `
                            @import "${BLOG_SRC}/styles/abstracts/_variables.scss";
                            @import "${BLOG_SRC}/styles/abstracts/_palette.scss";
                            @import "${BLOG_SRC}/styles/abstracts/_fonts.scss";
                            @import "${BLOG_SRC}/styles/abstracts/_mixins.scss";
                        `,
                    },
                },
            },
        };
        return customConfig;
    },
    docs: {
        autodocs: true,
    },
};

export default config;
