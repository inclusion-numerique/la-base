module.exports = {
  rules: {
    // Process exit ok in cli
    'unicorn/no-process-exit': 'off',
  },
  parserOptions: {
    project: 'tsconfig.json',
  },
}
