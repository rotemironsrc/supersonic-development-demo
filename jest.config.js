module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/server.ts"
    ]

};