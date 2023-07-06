import type { Config } from '@fuels/test-lib/config';
import { config as baseDefaultConfig } from '@fuels/test-lib/config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { globals, preset, ...baseConfig } = baseDefaultConfig;

const config: Config = {
  ...baseConfig,
  displayName: 'storage',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  injectGlobals: true,
  modulePathIgnorePatterns: ['/dist/'],
  resetMocks: false,
  rootDir: __dirname,
  roots: ['<rootDir>'],
  setupFiles: ['jest-localstorage-mock'],
  setupFilesAfterEnv: [require.resolve('@fuels/test-lib/setup')],
};

export default config;
