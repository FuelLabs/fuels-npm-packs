require('dotenv').config();

const path = require('path');

module.exports = (_options, { withReact, ts = true } = {}) => ({
  format: ['cjs', 'esm'],
  clean: false,
  sourcemap: true,
  shims: true,
  treeshake: true,
  publicDir: 'public',
  splitting: true,
  metafile: true,
  minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
  ...(withReact && { inject: [path.resolve(__dirname, './react-imports.js')] }),
  ...(ts && { onSuccess: 'tsc --emitDeclarationOnly --declaration' }),
});
