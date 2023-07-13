const nextConfig = require('eslint-config-next');

/*
 * @rushstack/eslint-patch is used to include plugins as dev
 * dependencies instead of imposing them as peer dependencies
 *
 * https://www.npmjs.com/package/@rushstack/eslint-patch
 */
const keptPaths = [];
const sortedPaths = [];
const cwd = process.cwd().replace(/\\/g, '/');
const originalPaths = require.resolve.paths('eslint-plugin-import');

// eslint throws a conflict error when plugins resolve to different
// locations, since we want to lock our dependencies by default
// but also need to allow using user dependencies this updates
// our resolve paths to first check the cwd and iterate to
// eslint-config-next's dependencies if needed

for (let i = originalPaths.length - 1; i >= 0; i--) {
  const currentPath = originalPaths[i];

  if (currentPath.replace(/\\/g, '/').startsWith(cwd)) {
    sortedPaths.push(currentPath);
  } else {
    keptPaths.unshift(currentPath);
  }
}

// maintain order of node_modules outside of cwd
sortedPaths.push(...keptPaths);

const hookPropertyMap = new Map(
  [
    ['eslint-plugin-import', 'eslint-plugin-import'],
    ['eslint-plugin-react', 'eslint-plugin-react'],
    ['eslint-plugin-jsx-a11y', 'eslint-plugin-jsx-a11y'],
  ].map(([request, replacement]) => [
    request,
    require.resolve(replacement, { paths: sortedPaths }),
  ]),
);

const mod = require('module');
const resolveFilename = mod._resolveFilename;
mod._resolveFilename = function (request, parent, isMain, options) {
  const hookResolved = hookPropertyMap.get(request);
  if (hookResolved) {
    request = hookResolved;
  }
  return resolveFilename.call(mod, request, parent, isMain, options);
};

require('@rushstack/eslint-patch/modern-module-resolution');

const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    commonjs: true,
    es6: true,
    es2020: true,
  },
  plugins: ['testing-library', 'jest-dom'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: [
        '.ts',
        '.mts',
        '.cts',
        '.tsx',
        '.d.ts',
      ],
    },
    'import/resolver': {
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      [require.resolve('eslint-import-resolver-typescript')]: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/consistent-type-imports': 2,
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-unused-disable': 'error',
    'import/no-anonymous-default-export': 'warn',
    'react/no-unknown-property': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/display-name': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
    'react/jsx-no-target-blank': 'off',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent'],
          ['sibling', 'index'],
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
  },
  // Disable no-unused-expressions to allow chai 'expect' expressions in testing
  overrides: [
    {
      files: ['*.test.{ts,tsx}'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};

module.exports = {
  ...config,
  configs: {
    monorepo: {
      settings: {
        ...config.settings,
        'import/resolver': {
          [require.resolve('eslint-import-resolver-node')]: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
          [require.resolve('eslint-import-resolver-typescript')]: {
            alwaysTryTypes: true,
            project: '**/tsconfig.json',
          },
        },
      },
    },
    nextjs: {
      extends: [...config.extends, 'plugin:@next/next/recommended'],
      plugins: [
        ...config.plugins,
        ...nextConfig.plugins.filter((f) => f !== 'import'),
      ],
      rules: {
        ...config.rules,
        ...Object.fromEntries(
          Object.entries(nextConfig.rules).filter(
            ([key]) => key !== 'import/order',
          ),
        ),
      },
    },
  },
};
