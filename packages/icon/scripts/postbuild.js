import { writeFileSync } from "fs";

const { default: icons } = await import("../dist/icons.json", { with: { type: "json" } });

writeFileSync(
    "./dist/constants.ts",
    `const icons = [
    ${Object.keys(icons)
        .map((key) => `'${key}'`)
        .join(",\n    ")},
] as const;

export default icons;`,
    "utf-8",
);
