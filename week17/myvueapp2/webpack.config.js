const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack"); // 用于访问内置插件
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  entry: "./src/main.js",
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: { loader: "babel-loader", options: { presets: ["@babel/preset-env"] } },
      },
    ],
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [{ from: "src/*.html", to: "[name].[ext]" }],
    }),
  ],
};

module.exports = config;
