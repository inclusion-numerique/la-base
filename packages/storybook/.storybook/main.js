import { parse } from 'dotenv'
import path from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const dotenvVariables = () => {
  const dotenvFile = path.resolve(dirname, '../../../.env')
  if (!existsSync(dotenvFile)) {
    return null
  }

  return parse(readFileSync(dotenvFile))
}

// See https://github.com/storybookjs/storybook/blob/111edc3929eb8afff1b58285b0b9c49dd493ae85/code/frameworks/nextjs/README.md
export default {
  stories: [
    '../../../apps/web/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    'storybook-addon-module-mock',
    '@storybook/addon-designs',
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(dirname, '../../../apps/web/next.config.js'),
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
