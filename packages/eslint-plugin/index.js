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
    commonjs: true,
    es6: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
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
        project: ['tsconfig.json', '**/**/tsconfig.json'],
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/consistent-type-imports': 2,
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
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
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-unused-disable': 'error',
    'import/namespace': [2, { allowComputed: true }],
    'import/no-anonymous-default-export': 'off',
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
  },
};

module.exports = {
  configs: {
    /** base configurations according to the project type */
    typescript: {
      ...config,
    },
    react: {
      ...config,
      extends: [
        ...config.extends,
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      rules: {
        ...config.rules,
        'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
        'jsx-a11y/aria-props': 'warn',
        'jsx-a11y/aria-proptypes': 'warn',
        'jsx-a11y/aria-unsupported-elements': 'warn',
        'jsx-a11y/no-autofocus': 'off',
        'jsx-a11y/role-has-required-aria-props': 'warn',
        'jsx-a11y/role-supports-aria-props': 'warn',
        'react/display-name': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-no-target-blank': 'off',
        'react/no-unknown-property': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
    jest: {
      ...config,
      plugins: ['testing-library', 'jest-dom'],
      env: {
        browser: true,
        node: true,
        jest: true,
        commonjs: true,
        es6: true,
        es2020: true,
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
    },
    /** confirations for specific frameworks */
    base: {
      extends: [
        'plugin:@fuels/typescript',
        'plugin:@fuels/jest',
        'plugin:@fuels/react',
      ],
    },
    next: {
      extends: ['plugin:@fuels/base', 'plugin:@next/next/recommended'],
    },
  },
};
