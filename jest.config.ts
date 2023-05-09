import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/jest/styles.js",
  },
  automock: false,
  resetMocks: false,
  collectCoverageFrom: [
    "src/**/*.{jsx,tsx}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/path/to/dir/",
  ],
  verbose: true,
};

export default config;
