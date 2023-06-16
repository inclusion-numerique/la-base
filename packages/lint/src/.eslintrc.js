// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:json/recommended',
    'turbo',
    'airbnb/base',
    'airbnb/hooks',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  rules: {
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    // We want this on, but a lot of libraries we integrate with need commonJs (eslint, next config ...)
    'unicorn/prefer-module': 'off',
    'unicorn/no-array-callback-reference': 'off',
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
      },
    ],
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['expect', 'expectZodValidationToFail'],
        additionalTestBlockFunctions: [],
      },
    ],
  },
  parserOptions: {
    sourceType: 'module',
  },
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // eslint-disable-next-line no-path-concat, unicorn/prefer-module
        project: `${__dirname}/../../../tsconfig.eslint.json`,
      },
      settings: {
        react: {
          version: '18.2',
        },
        'import/resolver': {
          'eslint-import-resolver-custom-alias': {
            alias: {
              '@prisma/migration-client': `${__dirname}/../../../packages/migration/prisma/migration-client`,
            },
            extensions: ['.ts'],
          },
          typescript: 'true',
          node: 'true',
        },
      },
      plugins: ['@typescript-eslint', 'import', 'prettier'],
      extends: [
        'turbo',
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:eslint-comments/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jest/recommended',
        'plugin:promise/recommended',
        'plugin:unicorn/recommended',
        'prettier',
      ],
      rules: {
        'no-irregular-whitespace': 'off',
        'no-restricted-syntax': 'off',
        'prettier/prettier': 'error',
        'no-continue': 'off',
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
        'unicorn/no-array-callback-reference': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-props-no-spreading': [
          'error',
          {
            custom: 'ignore',
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        // Null and undefined have different intent in our code, especially for integration with prisma and trpc
        'unicorn/no-null': 'off',
        'react/function-component-definition': [
          2,
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        // We use typescript default values and types
        'react/require-default-props': 'off',
        'unicorn/prevent-abbreviations': [
          'error',
          {
            allowList: {
              prop: true,
              Prop: true,
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
            },
          },
        ],
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              camelCase: true,
              pascalCase: true,
            },
          },
        ],
      },
    },
    {
      files: '**/*.cy.@(ts|tsx)',
      parserOptions: {
        // eslint-disable-next-line no-path-concat, unicorn/prefer-module
        project: `${__dirname}/../../../tsconfig.eslint.cy.json`,
      },
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
      rules: {
        'jest/expect-expect': 'off',
        // Cypress syntax uses then() for chainable elements
        'promise/catch-or-return': 'off',
        'promise/always-return': 'off',
        // We need to pass undefined to some custom commands
        'unicorn/no-useless-undefined': 'off',
      },
    },
    {
      files: '**/*.spec.ts',
      rules: {
        'jest/valid-title': 'off',
      },
    },
  ],
}
