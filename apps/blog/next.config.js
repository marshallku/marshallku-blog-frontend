/* eslint-disable turbo/no-undeclared-env-vars */
const path = require("path");

const analyzing = process.env.ANALYZE === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@marshallku/ui"],
    output: "standalone",
    assetPrefix: process.env.NEXT_PUBLIC_FILE_CDN_URL,
    experimental: {
        outputFileTracingRoot: path.join(__dirname, "../../"),
    },
    sassOptions: {
        prependData:
            '@import "src/styles/abstracts/_variables.scss";@import "src/styles/abstracts/_palette.scss";@import "src/styles/abstracts/_fonts.scss";@import "src/styles/abstracts/_mixins.scss";',
    },
    async redirects() {
        return [
            {
                source: "/web/tips/:path*",
                destination: "/dev/:path*",
                permanent: true,
            },
            {
                source: "/web/log/:path*",
                destination: "/dev/:path*",
                permanent: true,
            },
            {
                source: "/web/:path*",
                destination: "/dev/:path*",
                permanent: true,
            },
            {
                source: "/rss",
                destination: "/feed.xml",
                permanent: true,
            },
        ];
    },
};

if (analyzing) {
    const withBundleAnalyzer = require("@next/bundle-analyzer")({
        enabled: true,
    });
    module.exports = withBundleAnalyzer(nextConfig);
} else {
    module.exports = nextConfig;
}
