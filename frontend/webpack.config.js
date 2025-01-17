const path = require('path');

module.exports = {
  // Your existing webpack configuration...

  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "util": require.resolve("util/"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "url": require.resolve("url/"),
      "path": require.resolve('path-browserify'),
      "os": require.resolve('os-browserify/browser'),
      "crypto": require.resolve("crypto-browserify")
    },
  },
};
