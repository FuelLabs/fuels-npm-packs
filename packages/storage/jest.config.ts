import type { Config } from '@fuels/test-lib/config';
import { config as baseDefaultConfig } from '@fuels/test-lib/config';

import pkg from './package.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { globals, preset, ...baseConfig } = baseDefaultConfig;

const config: Config = {
  ...baseConfig,
  displayName: pkg.name,
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  injectGlobals: true,
  modulePathIgnorePatterns: ['/dist/'],
  resetMocks: false,
  rootDir: __dirname,
  setupFiles: ['jest-localstorage-mock'],
  setupFilesAfterEnv: [require.resolve('@fuels/test-lib/setup')],
  testTimeout: 10000,
};

export default config;
