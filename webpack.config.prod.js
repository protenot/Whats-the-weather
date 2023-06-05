const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCss = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",

  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    filename: "[name].[hash-8].js",
    path: path.resolve(__dirname, "./prod"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [miniCss.loader, "css-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(?:ico|gif|png|jpeg|jpg|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name]-[hash:5][ext]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
    new miniCss({
      filename: "style.css",
    }),
  ],

  devServer: {
    compress: false,
    open: true,
    port: 3000,
    hot: true,
  },
};
