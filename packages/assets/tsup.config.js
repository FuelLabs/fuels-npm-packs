import baseConfig from '@fuels/tsup-config';
import { defineConfig } from 'tsup';
import assets from './src';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export default defineConfig((options) => ({
  ...baseConfig(options),
  dts: true,
  entry: ['src/index.ts'],
  shims: false,
  treeshake: false,
  env: {
    BASE_URL: process.env.ASSETS_BASE_URL,
  },
  onSuccess() {
    const outputDir = join(__dirname, './images');
    mkdirSync(outputDir, {
      recursive: true,
    })
    writeFileSync(join(outputDir, './assets.json'), JSON.stringify(assets, null, ' '), {
      recursive: true,
    });
  }
}));
