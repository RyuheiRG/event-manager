module.exports = {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
      "/node_modules/(?!d3|d3-array|d3-scale)/"
    ],
  };
  