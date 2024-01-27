import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import css from 'rollup-plugin-css-only';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const createConfig = (name, useSvelte = false, additionalPlugins = []) => {
  return {
    input: `src/${name}/index.js`,
    output: {
      format: 'iife',
      file: `dist/${name}.js`,
      name,
      extend: true,
    },
    plugins: [
      useSvelte &&
        svelte({
          compilerOptions: {
            dev: !prod,
          },
          preprocess: sveltePreprocess(),
        }),
      css({ output: `${name}.css` }),
      useSvelte &&
        htmlTemplate({
          template: 'src/index.html',
          target: `dist/${name}.html`,
        }),

      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),
      commonjs(),
      prod && terser(),
      ...additionalPlugins,
    ],
  };
};

export default [
  createConfig('options', true, [
    del({
      targets: 'dist/*',
      hook: 'buildStart',
    }),
    copy({
      targets: [
        { src: 'src/manifest.json', dest: 'dist/' },
        { src: 'src/assets/', dest: 'dist/' },
      ],
    }),
  ]),
  createConfig('popup', true),
  createConfig('content-scripts', true),
  createConfig('background'),
];
