/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: ["@marshallku/eslint-config/storybook.js"],
    rules: {
        "import/no-extraneous-dependencies": "off",
        "unicorn/filename-case": "off",
    },
};
