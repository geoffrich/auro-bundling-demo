import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';

const production = !process.env.ROLLUP_WATCH;

// remove built-in support for shady DOM for modern browsers
const aliasConfig = {
    entries: [{
        find: 'lit-html/lib/shady-render.js',
        replacement: 'node_modules/lit-html/lit-html.js'
    }]
};

const modernConfig = {
    input: 'src/auro-bundle.js',
    output: {
        format: 'esm',
        file: 'dist/auro-bundle__bundled.js'
    },
    plugins: [
        alias(aliasConfig),
        resolve(),
        minifyHTML(),
        terser(),
        !production && serve(),
    ]
};

const legacyConfig = {
    input: 'src/auro-bundle.js',
    output: {
        format: 'iife',
        file: 'dist/auro-bundle__bundled.es5.js'
    },
    // TODO: open @rollup/plugin-babel issue
    // skipPreflightCheck flag needed or else build fails
    // see https://github.com/rollup/plugins/issues/381
    plugins: [
        resolve(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            envName: 'legacy',
            skipPreflightCheck: true
        }),
        minifyHTML(),
        terser()
    ]
};


// TODO: IE11 out of stack space error
export default [modernConfig, legacyConfig];