/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const analyzing = process.env.ANALYZE === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@marshallku/ui"],
    experimental: {
        outputFileTracingRoot: path.join(__dirname, "../../"),
    },
    sassOptions: {
        prependData: '@import "src/styles/palette.scss";@import "src/styles/abstracts/_font.scss";',
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
