require("@marshallku/eslint-config/patch");

/** @type {import("eslint").Linter.Config} */
module.exports = {
    env: { browser: true, es2020: true },
    extends: ["@marshallku/eslint-config", "@marshallku/eslint-config/mixins/next"],
    settings: {
        react: {
            version: "18.3",
        },
    },
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
};
