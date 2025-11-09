/// <reference types="vitest" />

import { readFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { codecovVitePlugin } from "@codecov/vite-plugin";
import react from "@vitejs/plugin-react";
import { glob } from "glob";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { viteStaticCopy } from "vite-plugin-static-copy";

const currentDirectory = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use "${join(currentDirectory, "./src/styles/abstracts/variables")}" as *;
                    @use "${join(currentDirectory, "./src/styles/abstracts/palette")}" as *;
                    @use "${join(currentDirectory, "./src/styles/abstracts/fonts")}" as *;
                    @use "${join(currentDirectory, "./src/styles/abstracts/mixins")}" as *;
                `,
            },
        },
    },
    plugins: [
        react(),
        libInjectCss(),
        dts({
            include: ["src"],
            exclude: ["src/**/*.test.ts", "src/**/*.test.tsx"],
            compilerOptions: {
                declarationMap: false,
            },
        }),
        viteStaticCopy({
            targets: [
                {
                    src: resolve("./src/styles"),
                    dest: "./",
                },
            ],
        }),
        codecovVitePlugin({
            bundleName: "@marshallku/ui",
            enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
            uploadToken: process.env.CODECOV_TOKEN,
        }),
    ],
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es"],
        },
        rollupOptions: {
            external: ["react", "react/jsx-runtime"],
            input: Object.fromEntries(
                glob
                    .sync("src/**/*.{ts,tsx}", {
                        ignore: ["src/**/*.d.ts", "src/**/*.test.ts", "src/**/*.test.tsx"],
                    })
                    .map((file) => [
                        relative("src", file.slice(0, file.length - extname(file).length)),
                        fileURLToPath(new URL(file, import.meta.url)),
                    ]),
            ),
            output: {
                assetFileNames: "assets/[name][extname]",
                entryFileNames: "[name].js",
                banner({ facadeModuleId }) {
                    if (!facadeModuleId) {
                        return "";
                    }

                    const file = readFileSync(facadeModuleId, "utf-8");
                    const hasDirectives = file.includes(`"use client"`);

                    if (!hasDirectives) {
                        return "";
                    }

                    return `"use client";\n\n`;
                },
            },
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            enabled: true,
            provider: "custom",
            customProviderModule: "vitest-monocart-coverage",
        },
    },
});
