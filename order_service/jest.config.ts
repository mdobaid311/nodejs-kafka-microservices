/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "src"],
};

module.exports = config;
