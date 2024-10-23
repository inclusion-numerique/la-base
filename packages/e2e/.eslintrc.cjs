module.exports = {
  rules: {
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          Env: true,
          env: true,
          e2e: true,
          E2e: true,
        },
      },
    ],
  },
  parserOptions: {
    project: 'tsconfig.json',
  },
}
