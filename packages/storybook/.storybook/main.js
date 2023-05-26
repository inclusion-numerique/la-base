/* eslint unicorn/prefer-module: 0,  @typescript-eslint/no-var-requires: 0, @typescript-eslint/unbound-method: 0 */

const { parse } = require('dotenv')
const { resolve } = require('node:path')
const { readFileSync, existsSync } = require('node:fs')

const dotenvVariables = () => {
  const dotenvFile = resolve(__dirname, '../../../.env')
  if (!existsSync(dotenvFile)) {
    return null
  }
  return parse(readFileSync(dotenvFile))
}

// See https://github.com/storybookjs/storybook/blob/111edc3929eb8afff1b58285b0b9c49dd493ae85/code/frameworks/nextjs/README.md
module.exports = {
  stories: [
    '../../../apps/web/src/**/*.mdx',
    '../../../apps/web/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: resolve(__dirname, '../../../apps/web/next.config.js'),
    },
  },
  staticDirs: ['../../../apps/web/public', '../public'],
  features: {
    interactionsDebugger: true,
  },
  docs: {
    docsPage: true,
    autodocs: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  env: (config) => ({
    ...config,
    ...dotenvVariables(),
  }),
}
