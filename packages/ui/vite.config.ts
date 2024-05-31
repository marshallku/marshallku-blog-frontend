/// <reference types="vitest" />

import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { extname, relative, resolve } from "node:path";
import { defineConfig } from "vite";
import { glob } from "glob";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "src/styles/abstracts/_variables.scss";
                    @import "src/styles/abstracts/_palette.scss";
                    @import "src/styles/abstracts/_fonts.scss";
                    @import "src/styles/abstracts/_mixins.scss";
                `,
            },
        },
    },
    plugins: [
        react(),
        libInjectCss(),
        dts({ include: ["src"] }),
        viteStaticCopy({
            targets: [
                {
                    src: resolve("./src/styles"),
                    dest: "./",
                },
            ],
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
    },
});
