import React from 'react'
import '@app/web/styles/index.css'
import { Preview } from '@storybook/react'
import { DEFAULT_VIEWPORT, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'

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
    viewport: {
      defaultViewport: DEFAULT_VIEWPORT,
      viewports: {
        ...MINIMAL_VIEWPORTS,
        mediumContainer: {
          name: 'Medium container',
          styles: {
            width: '792px',
            height: '1000px',
          },
        },
        narrowContainer: {
          name: 'Narrow container',
          styles: {
            width: '588px',
            height: '1000px',
          },
        },
        container: {
          name: 'Container',
          styles: {
            width: '1200px',
            height: '1000px',
          },
        },
      },
    },
  },
  decorators: [
    (Story) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      if (!(window as any).dsfrIsSetup) {
        loadDsfrJs()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        ;(window as any).dsfrIsSetup = true
      }

      return <Story />
    },
  ],
}

export default preview
