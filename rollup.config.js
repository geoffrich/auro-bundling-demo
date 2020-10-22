import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
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

export default {
    input: 'src/auro-bundle.js',
    output: {
        sourcemap: true,
        format: 'esm',
        file: 'dist/auro-bundle__bundled.js'
    },
    plugins: [
        alias(aliasConfig),
        resolve(),
        minifyHTML(),
        terser(),
        !production && serve(),
    ],
    watch: {
        clearScreen: false
    }
};
