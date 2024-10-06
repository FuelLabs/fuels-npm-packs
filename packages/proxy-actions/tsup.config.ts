export default {
  sourcemap: true, // Useful for debugging CLI
  shims: true, // Helps with Node.js environments
  dts: false, // Typically not needed for CLI binaries
  format: ['cjs', 'esm'], // Provide CommonJS and ESM support for wider compatibility
  minify: true, // Usually, you want to minify the CLI for performance
  entry: ['./src/index.ts'], // Entry point remains the same unless specified otherwise
  target: 'node14', // Target a specific Node.js version for CLI
  outDir: 'dist', // Specify output directory for clarity
  clean: true, // Clean the output directory before building
};
