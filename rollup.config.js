import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';

const production = !process.env.ROLLUP_WATCH;

/*
TODO:
- handling multiple components?
- browserslist
- dedupe
- one config with output plugins? https://rollupjs.org/guide/en/#outputplugins
- do we need babel for modern build?
- documentation
*/


const modernConfig = {
    input: 'src/auro-bundle.js',
    output: {
        format: 'esm',
        file: 'dist/auro-bundle__bundled.js'
    },
    plugins: [
        // remove shady DOM polyfill for modern browsers
        alias({
            entries: [{
                find: 'lit-html/lib/shady-render.js',
                replacement: 'node_modules/lit-html/lit-html.js'
            }]
        }),
        resolve(),
        minifyHTML(),
        terser(),
        !production && serve({
            open: true,
            openPage: '/docs/'
        }),
    ]
};

const legacyConfig = {
    input: 'src/auro-bundle.es5.js',
    output: {
        format: 'iife',
        file: 'dist/auro-bundle__bundled.es5.js'
    },

    plugins: [
        resolve(),
        commonjs(),
        // skipPreflightCheck flag needed or else build fails
        // see https://github.com/rollup/plugins/issues/381
        babel({
            babelHelpers: 'bundled',
            envName: 'legacy',
            skipPreflightCheck: true
        }),
        minifyHTML(),
        terser()
    ]
};


export default [modernConfig, legacyConfig];