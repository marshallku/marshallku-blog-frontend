const storyData = require("../docs/storybook-static/index.json");

const stories = Object.values(storyData.entries);
const blackList = ["components-loader--default"];

/** @type {import('backstopjs').Config} */
const config = {
    id: "backstop_default",
    viewports: [
        {
            label: "phone",
            width: 320,
            height: 480,
        },
        {
            label: "tablet",
            width: 1024,
            height: 768,
        },
    ],
    onBeforeScript: "puppet/onBefore.js",
    onReadyScript: "puppet/onReady.js",
    scenarios: stories
        .filter((story) => story.type !== "docs" && !blackList.includes(story.id))
        .map((story) => ({
            label: story.id,
            cookiePath: "",
            url: `http://localhost:8083/iframe.html?id=${story.id}&viewMode=story`,
            referenceUrl: "",
            readyEvent: "",
            readySelector: "#storybook-root",
            delay: 3000,
            hideSelectors: [],
            removeSelectors: [],
            hoverSelector: "",
            clickSelector: "",
            postInteractionWait: 0,
            selectors: [],
            selectorExpansion: true,
            expect: 0,
            misMatchThreshold: 0.1,
            requireSameDimensions: true,
        })),
    paths: {
        bitmaps_reference: "backstop_data/bitmaps_reference",
        bitmaps_test: "backstop_data/bitmaps_test",
        engine_scripts: "backstop_data/engine_scripts",
        html_report: "backstop_data/html_report",
        ci_report: "backstop_data/ci_report",
    },
    report: ["browser"],
    engine: "puppeteer",
    engineOptions: {
        args: ["--no-sandbox"],
    },
    asyncCaptureLimit: 5,
    asyncCompareLimit: 50,
    debug: false,
    debugWindow: false,
};

module.exports = config;
