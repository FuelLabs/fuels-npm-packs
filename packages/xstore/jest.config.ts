import type { Config } from '@fuels/jest/config';
import { config as baseDefaultConfig } from '@fuels/jest/config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { globals, preset, ...baseConfig } = baseDefaultConfig;

const config: Config = {
  ...baseConfig,
  displayName: 'xstore',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  injectGlobals: true,
  modulePathIgnorePatterns: ['/dist/'],
  resetMocks: false,
  rootDir: __dirname,
  roots: ['<rootDir>'],
  setupFiles: ['jest-localstorage-mock'],
  setupFilesAfterEnv: [require.resolve('@fuels/jest/setup')],
};

export default config;
