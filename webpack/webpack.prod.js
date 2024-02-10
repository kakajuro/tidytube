const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');

const sveltePreprocess = require('svelte-preprocess');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: false
            },
            emitCss: true,
            hotReload: false,
            preprocess: svelteConfig.preprocess
          }
        }
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        /*
         * Google requires some conditions:
         * - Removal of whitespace, newlines, code comments, and block delimiters
         * - Shortening of variable and function names
         * - Collapsing the number of JavaScript files
         */
        terserOptions: {
          compress: true, // To rename variables & function names
          mangle: true, // Note `mangle.properties` is `false` by default.
        },
      }),
    ],
  },
});
