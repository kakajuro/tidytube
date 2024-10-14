const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const postcss = require("postcss-loader");

const dotenv = require("dotenv");
const { DefinePlugin } = require("webpack");

const browser = process.env.BROWSER;
const BUILD_DIR_NAME = `${browser.toLowerCase()}_dist`;
const SRC_DIR_NAME = 'src';

module.exports = {
  entry: {
    popup: path.join(__dirname, `../${SRC_DIR_NAME}/popup.ts`),
    options: path.join(__dirname, `../${SRC_DIR_NAME}/options.ts`),
    background: path.join(__dirname, `../${SRC_DIR_NAME}/background/background.ts`),
    "tidytube-cs": path.join(__dirname, `../${SRC_DIR_NAME}/content/tidytube-cs.ts`)
  },
  output: {
    path: path.join(__dirname, `../dist/${BUILD_DIR_NAME}`),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      }
    ],
  },
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json'))
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    conditionNames: ['svelte', 'browser']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyPlugin({
      patterns: [
        { from: './images', to: `../${BUILD_DIR_NAME}/images`, context: 'public' },
        { from: './popup.html', to: `../${BUILD_DIR_NAME}/popup.html`, context: 'public' },
        { from: './options.html', to: `../${BUILD_DIR_NAME}/options.html`, context: 'public' },
        { from: `${browser}_manifest.json`, to: `../${BUILD_DIR_NAME}/manifest.json`, context: 'public' },
      ],
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(dotenv.config().parsed)
    })
  ],
};
