import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const env = process.env.NODE_ENV

const config = {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'ReactSizes',
    exports: 'named',
    globals: {
      react: 'React',
    },
  },
  external: ['react'],
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    commonjs(),
  ],
}

if (env === 'production') {
  config.plugins.push(terser())
}

export default config
