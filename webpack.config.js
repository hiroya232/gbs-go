module.exports = {
  mode: "development",
  entry: "./src/ts/main.ts",
  output: {
    path: `${__dirname}/public`,
    filename: "main.js",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },
};
