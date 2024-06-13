/* eslint unicorn/prefer-module: 0,  @typescript-eslint/no-var-requires: 0, @typescript-eslint/unbound-method: 0 */
const { parse } = require('dotenv')
const { resolve, dirname, join } = require('node:path')
const { readFileSync, existsSync } = require('node:fs')

const dotenvVariables = () => {
  const dotenvFile = resolve(__dirname, '../../../.env')
  if (!existsSync(dotenvFile)) {
    return null
  }

  return parse(readFileSync(dotenvFile))
}

const getAbsolutePath = (value) =>
  dirname(require.resolve(join(value, 'package.json')))

// See https://github.com/storybookjs/storybook/blob/111edc3929eb8afff1b58285b0b9c49dd493ae85/code/frameworks/nextjs/README.md
module.exports = {
  stories: [
    '../../../apps/web/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-jest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('@storybook/addon-designs'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {
      nextConfigPath: resolve(__dirname, '../../../apps/web/next.config.js'),
    },
  },

  staticDirs: ['../../../apps/web/public', '../public'],

  features: {
    interactionsDebugger: true,
  },

  docs: {},

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  env: (config) => ({
    ...config,
    ...dotenvVariables(),
  }),

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}
