import baseConfig from '@fuels/config-tsup';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  ...baseConfig(options),
  external: ['react', 'react-dom', 'xstate', '@xstate/react'],
  entry: ['src/index.ts'],
}));
