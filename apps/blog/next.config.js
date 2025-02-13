/* eslint-disable turbo/no-undeclared-env-vars */
const path = require("path");

const analyzing = process.env.ANALYZE === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@marshallku/ui", "next-mdx-remote"],
    output: "standalone",
    assetPrefix: process.env.NEXT_PUBLIC_FILE_CDN_URL,
    outputFileTracingRoot: path.join(__dirname, "../../"),
    sassOptions: {
        prependData: `
            @use "@marshallku/ui/styles/abstracts/variables" as *;
            @use "@marshallku/ui/styles/abstracts/palette" as *;
            @use "@marshallku/ui/styles/abstracts/fonts" as *;
            @use "@marshallku/ui/styles/abstracts/mixins" as *;
        `,
    },
    pageExtensions: ["ts", "tsx", "mdx"],
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
