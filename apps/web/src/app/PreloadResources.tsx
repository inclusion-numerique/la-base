'use client'

import ReactDOM from 'react-dom'

// React 18.3 does not yet include type definitions for ReactDOM.preload, ReactDOM.preconnect, and ReactDOM.preconnectDNS. You can use // @ts-ignore as a temporary solution to avoid type errors.
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
const Rd = ReactDOM as any

const stylesToInit = [
  '/dsfr/dsfr.min.css',
  '/dsfr/utility/utility.min.css',
  'https://cdn.jsdelivr.net/npm/remixicon@3.3.0/fonts/remixicon.css',
]
const fontsToPreload = ['Marianne-Regular', 'Marianne-Bold', 'Marianne-Medium']

export const PreloadResources = () => {
  for (const style of stylesToInit) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    Rd.preload(style, {
      as: 'style',
      type: 'text/css',
      crossOrigin: 'anonymous',
    })
  }

  for (const font of fontsToPreload) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    Rd.preload(`/dsfr/fonts/${font}.woff2`, {
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    })
  }

  return null
}
