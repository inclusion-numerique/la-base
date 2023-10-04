// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  extends: ['next/core-web-vitals'],
  parserOptions: {
    project: 'tsconfig.json',
  },
  rules: {
    'jest/expect-expect': [
      2,
      {
        assertFunctionNames: ['expect', 'expectZodValidationToFail'],
      },
    ],
  },
}
