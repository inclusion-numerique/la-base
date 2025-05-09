'use client'

import ReactDOM, { type PreloadOptions } from 'react-dom'

const fontsToPreload = ['Marianne-Regular', 'Marianne-Bold', 'Marianne-Medium']

export const PreloadResources = () => {
  for (const font of fontsToPreload) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    ReactDOM.preload(`/dsfr/fonts/${font}.woff2`, {
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    } as PreloadOptions)
  }

  return null
}
