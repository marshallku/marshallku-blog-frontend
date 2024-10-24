import { resolve, join } from "node:path";

const UI_ROOT = resolve("../../packages", "ui");
const UI_SRC = join(UI_ROOT, "src");

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@marshallku/ui"],
    sassOptions: {
        prependData: `
            @use "${UI_SRC}/styles/abstracts/variables" as *;
            @use "${UI_SRC}/styles/abstracts/palette" as *;
            @use "${UI_SRC}/styles/abstracts/fonts" as *;
            @use "${UI_SRC}/styles/abstracts/mixins" as *;
        `,
    },
    swcMinify: false,
};

export default nextConfig;
