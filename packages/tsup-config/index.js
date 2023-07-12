require('dotenv').config();

const path = require('path');

module.exports = (_options, { withReact, ts = true } = {}) => ({
  format: ['cjs', 'esm'],
  splitting: false,
  clean: false,
  sourcemap: true,
  shims: true,
  treeshake: true,
  minify: process.env.NODE_ENV === 'production',
  ...(withReact && { inject: [path.resolve(__dirname, './react-imports.js')] }),
  ...(ts && { onSuccess: 'tsc --emitDeclarationOnly --declaration' }),
});
