import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: ["../stories/**/*.stories.tsx", "../../blog/src/**/*.stories.tsx"],
    framework: {
        name: "@storybook/nextjs",
        options: {
            nextConfigPath: resolve("./next.config.js"),
        },
    },
    addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-docs"],
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
