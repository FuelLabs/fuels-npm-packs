import baseConfig from '@fuels/config-tsup';
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  ...baseConfig(options),
  entry: ['src/index.ts'],
}));
