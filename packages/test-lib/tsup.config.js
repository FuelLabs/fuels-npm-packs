import baseConfig from '@fuels/config-tsup';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  ...baseConfig(options),
  external: ['react', 'react-dom', 'jest'],
  entry: ['src/index.ts', 'config.ts', 'setup.ts'],
}));
