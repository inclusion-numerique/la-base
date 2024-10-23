// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  rules: {
    // CDKTF uses new {Resource}() as a syntax to add
    'no-new': 'off',
  },
  parserOptions: {
    project: 'tsconfig.json',
  },
}
