// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    collectCoverage: true,
    coverageDirectory: "./coverage/",
    moduleFileExtensions: ["js", "json", "vue", "md"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    transform: {
        "^.+\\.vue$": "@vue/vue3-jest",
        "^.+\\.js$": "babel-jest",
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
    verbose: true,
    testEnvironment: "jsdom",
};
