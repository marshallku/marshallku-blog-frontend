import { resolve, join } from "node:path";

const UI_ROOT = resolve("../../packages", "ui");
const UI_SRC = join(UI_ROOT, "src");

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@marshallku/ui"],
    sassOptions: {
        prependData: `
            @import "${UI_SRC}/styles/abstracts/_variables.scss";
            @import "${UI_SRC}/styles/abstracts/_palette.scss";
            @import "${UI_SRC}/styles/abstracts/_fonts.scss";
            @import "${UI_SRC}/styles/abstracts/_mixins.scss";
        `,
    },
    swcMinify: false,
};

export default nextConfig;
