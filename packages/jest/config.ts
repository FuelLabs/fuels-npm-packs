import type { Config } from 'jest';
import path from 'node:path';

function root(glob: string, exclude = false) {
  return path.join(`${exclude ? '!' : ''}<rootDir>`, glob);
}

export type { Config };

export const swcTransform = {
  jsc: {
    transform: {
      react: {
        runtime: 'automatic',
      },
    },
  },
};

export const config: Config = {
  transform: {
    '.*\\.(tsx?)$': ['@swc/jest', swcTransform],
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [path.join(__dirname, 'setup.ts')],
  testMatch: [root('**/?(*.)+(spec|test).[jt]s?(x)')],
  setupFiles: ['dotenv/config'],
  testPathIgnorePatterns: ['/node_modules/'],
  modulePathIgnorePatterns: ['/dist/', '/node_modules/'],
  coveragePathIgnorePatterns: ['/dist/'],
  reporters: ['default', 'github-actions'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
    '~/(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  collectCoverageFrom: [
    root('src/**/*.{ts,tsx}'),
    root('types/**', true),
    root('**/*d.ts', true),
    root('**/*test.{ts,tsx}', true),
    root('**/*stories.{ts,tsx}', true),
    root('**/test-*.{ts}', true),
    root('**/__mocks__/**', true),
    root('**/jest.config.ts', true),
  ],
};
