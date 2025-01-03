// filepath: /C:/Users/danie/OneDrive/Coding/Projects/todolist-next/todolist-next/jest.config.js
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.css$": "jest-css-modules-transform"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!ansi-regex|ansi-styles|chalk)"
  ]
};