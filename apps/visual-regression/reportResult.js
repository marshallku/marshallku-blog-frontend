const fs = require("fs/promises");
const path = require("path");

async function main() {
    const reportPath = path.resolve(__dirname, "backstop_data/bitmaps_test");
    const directories = await fs.readdir(reportPath);
    const lastDirectory = directories[directories.length - 1];
    const report = JSON.parse(await fs.readFile(path.resolve(reportPath, lastDirectory, "report.json"), "utf-8"));
    const sorted = report.tests.sort((a) => (a.status === "fail" ? -1 : 0));
    const tableHeads = ["Component", "Story", "Success", "Viewport", "MisMatch Percentage"];
    const tableData = [
        tableHeads,
        tableHeads.map(() => "-"),
        ...sorted.map(({ pair, status }) => [
            pair.label.split("--")[0],
            pair.label.split("--")[1],
            status === "fail" ? "❌" : "✅",
            pair.viewportLabel,
            pair.diff ? `${pair.diff.misMatchPercentage}%` : "100%(no reference)",
        ]),
    ];

    console.log("TEST_RESULT<<EOF");
    console.log(tableData.map((row) => `| ${row.join(" | ")} |`).join("\n"));
    console.log("EOF");
}

main();
