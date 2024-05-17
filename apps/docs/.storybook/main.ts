import { dirname, join, resolve } from "path";
import type { StorybookConfig } from "@storybook/nextjs";

const BLOG_SRC = resolve("../blog/src");

function getAbsolutePath<T extends string>(value: T): T {
    return dirname(require.resolve(join(value, "package.json"))) as T;
}

const config: StorybookConfig = {
    stories: ["../stories/**/*.stories.tsx"],
    addons: [
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-docs"),
    ],
    framework: {
        name: getAbsolutePath("@storybook/nextjs"),
        options: {
            nextConfigPath: resolve("./next.config.js"),
        },
    },
    staticDirs: [
        {
            from: resolve("../blog/public"),
            to: "public",
        },
    ],
    docs: {
        autodocs: true,
    },
};

export default config;
