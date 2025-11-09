const reactConfig = require("@marshallku/eslint-config/react");

module.exports = [
    ...reactConfig,
    {
        // Custom rules for UI package
        rules: {
            "@rushstack/typedef-var": "off",
        },
    },
];
