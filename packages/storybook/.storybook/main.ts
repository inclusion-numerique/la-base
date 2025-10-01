import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/nextjs'
import { parse } from 'dotenv'

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
const config: StorybookConfig = {
  stories: [
    '../../../apps/web/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(dirname, '../../../apps/web/next.config.js'),
    },
  },

  staticDirs: ['../../../apps/web/public', '../public'],

  features: {},

  docs: {},

  env: (config) => ({
    ...config,
    ...dotenvVariables(),
  }),

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}

export default config
