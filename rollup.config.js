import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import analyze from 'rollup-plugin-analyzer';
import alias from '@rollup/plugin-alias';

const production = !process.env.ROLLUP_WATCH;
const cdnPackages = ['lit-element', 'lit-html', 'focus-visible/dist/focus-visible.min.js'];
const cdnPackageUrls = cdnPackages.map(pkg => `https://cdn.skypack.dev/${pkg}?min`);
const aliasEntries = cdnPackages.map((pkg, idx) => ({ find: pkg, replacement: cdnPackageUrls[idx] }) );

export default {
    external: cdnPackageUrls,
    input: 'src/auro-bundle.js',
    output: {
        sourcemap: true,
        format: 'esm',
        file: 'dist/auro-bundle__bundled.js'
    },
    plugins: [
        alias({ entries: aliasEntries }),
        resolve(),
        !production && livereload('public'),
        !production && serve(),
        production && terser(),
        // analyze(),

    ],
    watch: {
        clearScreen: false
    }
};
