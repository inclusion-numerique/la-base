'use client'

import ReactDOM, { type PreloadOptions } from 'react-dom'

const fontsToPreload = ['Marianne-Regular', 'Marianne-Bold', 'Marianne-Medium']

export const PreloadResources = () => {
  for (const font of fontsToPreload) {
    ReactDOM.preload(`/dsfr/fonts/${font}.woff2`, {
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    } as PreloadOptions)
  }

  return null
}
