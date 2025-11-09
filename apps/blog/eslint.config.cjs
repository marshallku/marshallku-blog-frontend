const nextConfig = require("@marshallku/eslint-config/next");

module.exports = [
    ...nextConfig,
    {
        // Custom rules for blog app
        rules: {
            "testing-library/prefer-screen-queries": "off",
        },
    },
];
