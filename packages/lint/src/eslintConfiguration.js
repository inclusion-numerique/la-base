// Extends has to be reused for each override that add to this array
const typescriptExtends = [
  'turbo',
  'airbnb',
  'airbnb-typescript',
  'airbnb/hooks',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'plugin:eslint-comments/recommended',
  'plugin:import/recommended',
  'plugin:import/typescript',
  'plugin:promise/recommended',
  'plugin:unicorn/recommended',
  'prettier',
]

const allowedAbbreviations = {
  Props: true,
  props: true,
  args: true,
  Param: true,
  param: true,
  Params: true,
  params: true,
  Env: true,
  env: true,
  ref: true,
  Ref: true,
  refs: true,
  Refs: true,
  res: true,
  varDirectory: true,
  createVarDirectory: true,
}

// This will be exported from the root of the project
// Paths are relative to the root of the project
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'turbo',
    'airbnb/base',
    'airbnb/hooks',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  rules: {
    // We want this on, but a lot of libraries we integrate with need commonJs (eslint, next config ...)
    'unicorn/prefer-module': 'off',
    'no-irregular-whitespace': 'off',
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/prefer-query-selector': 'off',
    'no-continue': 'off',
    'prettier/prettier': 'error',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // Null and undefined have different intent in our code, especially for integration with prisma and trpc
    'unicorn/no-null': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: ['.json$'],
      },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: allowedAbbreviations,
      },
    ],
  },
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.3',
    },
  },
  overrides: [
    // Typescript packages
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'import', 'prettier'],
      extends: [...typescriptExtends],
      settings: {
        'import/resolver': {
          typescript: 'true',
          node: 'true',
        },
        react: {
          version: '18.2',
        },
      },
      rules: {
        // Typescript compiler will avoid errors based on inconsistent returns
        'consistent-return': 'off',
        'import/order': [
          'error',
          {
            pathGroups: [
              {
                pattern: '@app/**',
                group: 'external',
                position: 'after',
              },
            ],
          },
        ],
        'no-underscore-dangle': 'off',
        'unicorn/prefer-module': 'off',
        'no-restricted-syntax': 'off',
        'no-irregular-whitespace': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/prefer-query-selector': 'off',
        'no-continue': 'off',
        // Module resolve leads to false negatives in monorepo, typescript compiler will handle any error
        'import/no-unresolved': [
          2,
          { ignore: ['^@app/', '^react-hook-form/dist'] },
        ],
        // This rule is unreliable in monorepos and typescript compiler will help on bad imports
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        // We want to make sure anyone ask the question, should i await this promise ?
        '@typescript-eslint/no-floating-promises': 'warn',
        'import/prefer-default-export': 'off',
        'react/jsx-props-no-spreading': [
          'error',
          {
            custom: 'ignore',
          },
        ],
        // We use typescript-eslint rule
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        'react/function-component-definition': [
          2,
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        // We use typescript default values and types
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'unicorn/prevent-abbreviations': [
          'error',
          {
            allowList: allowedAbbreviations,
          },
        ],
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              camelCase: true,
              pascalCase: true,
            },
            ignore: ['.json$'],
          },
        ],
        'unicorn/no-array-reduce': 'off',
      },
    },
    // Jest test files
    {
      files: '**/*.+(spec|integration).+(ts|tsx)',
      plugins: ['jest'],
      extends: [...typescriptExtends, 'plugin:jest/recommended'],
      rules: {
        // Only add rules that are specific to jest here
        '@typescript-eslint/no-loop-func': 'off',
        'import/no-extraneous-dependencies': 'off',
        'unicorn/no-null': 'off',
        'no-restricted-syntax': 'off',
        'unicorn/prefer-module': 'off',
      },
    },
    // Typescript e2e package with cypress
    {
      files: './packages/e2e/**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      plugins: ['cypress'],
      extends: [...typescriptExtends, 'plugin:cypress/recommended'],
      rules: {
        // Only add rules that are specific to cypress here
        'import/no-extraneous-dependencies': 'off',
        'unicorn/no-null': 'off',
        'import/prefer-default-export': 'off',
        'no-restricted-syntax': 'off',
        // Cypress .then() syntax is helpful without these rules
        'promise/catch-or-return': 'off',
        'promise/always-return': 'off',
        'cypress/unsafe-to-chain-command': 'off',
      },
    },
    // Json files
    {
      files: '**/*.json',
      plugins: ['json'],
      extends: ['plugin:json/recommended-legacy'],
    },
  ],
}
