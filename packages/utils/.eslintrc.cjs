require("@marshallku/eslint-config/patch");

/** @type {import("eslint").Linter.Config} */
module.exports = {
    env: { browser: true, es2020: true },
    extends: ["@marshallku/eslint-config"],
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
};
