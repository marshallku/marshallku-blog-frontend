import { writeFileSync, readFileSync } from "fs";

const icons = JSON.parse(readFileSync("./dist/icons.json", "utf-8"));
const content = `const icons = [
    ${Object.keys(icons)
        .sort((a, b) => a.localeCompare(b))
        .map((key) => `"${key}"`)
        .join(",\n    ")},
] as const;

export default icons;`;

writeFileSync("./src/constants/index.ts", content, "utf-8");
writeFileSync("./dist/constants.ts", content, "utf-8");
