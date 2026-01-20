export default {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/"],
  setupFiles: ["<rootDir>/tests/jest.setup.js"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
