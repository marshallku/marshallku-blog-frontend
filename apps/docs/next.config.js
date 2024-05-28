import { resolve, join } from "node:path";

const BLOG_ROOT = resolve("..", "blog");
const BLOG_SRC = join(BLOG_ROOT, "src");

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@marshallku/ui"],
    sassOptions: {
        prependData: `
            @import "${BLOG_SRC}/styles/abstracts/_variables.scss";
            @import "${BLOG_SRC}/styles/abstracts/_palette.scss";
            @import "${BLOG_SRC}/styles/abstracts/_fonts.scss";
            @import "${BLOG_SRC}/styles/abstracts/_mixins.scss";
        `,
    },
    swcMinify: false,
};

export default nextConfig;
