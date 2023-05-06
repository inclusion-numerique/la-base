import React from 'react'
import { useRef } from '@storybook/addons'
import { Preview } from '@storybook/react'
import '@app/web/app/app.css'

const loadDsfrJs = () => {
  const existing = document.querySelector('#dsfr-js')
  if (existing) {
    return
  }

  const script = document.createElement('script')
  script.id = 'dsfr-js'
  script.src = '/dsfr/dsfr.module.min.js'
  document.body.append(script)
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      story: {
        // inline: false,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => {
      const isSetup = useRef(false)
      if (!isSetup.current) {
        loadDsfrJs()
        isSetup.current = true
      }
      return <Story />
    },
  ],
}

export default preview
