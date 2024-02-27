import { dirname, join, resolve } from "path";

const BLOG_SRC = resolve("../blog/src");

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

    features: {
        buildStoriesJson: true,
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
                postcss: null,
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
    },

    docs: {
        autodocs: true,
    },
};

export default config;
