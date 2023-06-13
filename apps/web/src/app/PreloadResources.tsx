'use client'

import ReactDOM from 'react-dom'

// React 18.3 does not yet include type definitions for ReactDOM.preload, ReactDOM.preconnect, and ReactDOM.preconnectDNS. You can use // @ts-ignore as a temporary solution to avoid type errors.
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
const Rd = ReactDOM as any

const fontsToPreload = ['Marianne-Regular', 'Marianne-Bold', 'Marianne-Medium']

export const PreloadResources = () => {
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
