import type { Config as JestConfig } from 'jest';
import path from 'node:path';

export type Config = JestConfig;

function root(glob: string, exclude = false) {
  return path.join(`${exclude ? '!' : ''}<rootDir>`, glob);
}

export const config: Config = {
  transform: {
    '.*\\.(tsx?)$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    path.join(__dirname, 'setup.ts'),
  ],
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
