module.exports = {
  rules: {
    // Process exit ok in scripts
    'unicorn/no-process-exit': 'off',
  },
  parserOptions: {
    project: 'tsconfig.json',
  },
}
