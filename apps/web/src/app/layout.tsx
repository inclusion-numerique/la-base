import { Metadata } from 'next'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { setLink } from '@codegouvfr/react-dsfr/link'
import { Dsfr } from '@app/web/app/Dsfr'
import { EnvInformation } from '@app/web/app/EnvInformation'
import { Matomo } from '@app/web/app/Matomo'
import { PreloadResources } from '@app/web/app/PreloadResources'
import '@app/web/app/app.css'
import { PublicWebAppConfig } from '@app/web/webAppConfig'

declare module '@codegouvfr/react-dsfr/link' {
  interface RegisterLink {
    Link: typeof Link
  }
}

setLink({
  Link,
})

export const metadata: Metadata = {
  title: PublicWebAppConfig.projectTitle,
  themeColor: '#000091',
  // Do not index while we are not in production
  robots: 'noindex, nofollow',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
    other: {
      rel: 'icon',
      url: '/favicon/favicon.svg',
      type: 'image/svg+xml',
    },
  },
  description: PublicWebAppConfig.projectTitle,
  manifest: '/favicon/manifest.webmanifest',
}

const RootLayout = ({ children }: PropsWithChildren) => {
  // Do we want to disable SSG for CSFR on this website ?
  // const nonce = headers().get('x-sde-script-nonce') ?? undefined
  const nonce = undefined
  return (
    <html lang="fr" data-fr-theme="light" data-fr-scheme="light">
      <body>
        <PreloadResources />
        <Dsfr nonce={nonce} />
        <Matomo nonce={nonce} />
        <EnvInformation />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
