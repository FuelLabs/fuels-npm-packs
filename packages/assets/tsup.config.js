import baseConfig from '@fuels/tsup-config';
import { defineConfig } from 'tsup';
import { assets, resolveIconPath } from './src';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export default defineConfig((options) => ({
  ...baseConfig(options),
  dts: true,
  entry: ['src/index.ts'],
  shims: false,
  treeshake: false,
  env: {
    BASE_URL: process.env.ASSETS_BASE_URL || '',
  },
  onSuccess() {
    const outputDir = join(__dirname, './images');
    mkdirSync(outputDir, {
      recursive: true,
    });
    const assetsData = resolveIconPath(process.env.ASSETS_BASE_URL, assets);
    writeFileSync(
      join(outputDir, './assets.json'),
      JSON.stringify(assetsData, ' ', 2),
      {
        recursive: true,
      },
    );
  },
}));
