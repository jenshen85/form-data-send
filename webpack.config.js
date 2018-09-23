const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const basicConfig = {
  entry: {
    index: "./src/js/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/assets/js/"),
    publicPath: "/assets/js/",
    filename: "[name].bundle.js",
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerPort: 9000,
      openAnalyzer: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          // chunks: 'all',
          // minChunks: 2
        },
      }
    }
  }
};

if (!dev) {
  basicConfig.mode = 'production'
} else {
  basicConfig.mode = 'development'
  basicConfig.devtool = "inline-source-map";
}

module.exports = basicConfig;

