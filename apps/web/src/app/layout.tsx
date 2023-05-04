import '@app/web/app/app.css'
import { PropsWithChildren, ReactNode } from 'react'
import { PublicWebAppConfig } from '@app/web/webAppConfig'
import { Metadata } from 'next'
import { Dsfr } from '@app/web/app/Dsfr'
import { Matomo } from '@app/web/app/Matomo'
import { PreloadResources } from '@app/web/app/PreloadResources'
import { EnvInformation } from '@app/web/app/EnvInformation'
import { getServerBaseUrl } from '@app/web/utils/baseUrl'
import Link from 'next/link'
import { setLink } from '@codegouvfr/react-dsfr/link'

declare module '@codegouvfr/react-dsfr/link' {
  interface RegisterLink {
    Link: typeof Link
  }
}

setLink({
  Link,
})

export const generateMetadata = (): Metadata => ({
  metadataBase: new URL(getServerBaseUrl()),
  title: PublicWebAppConfig.projectTitle,
  themeColor: '#000091',
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
})

const RootLayout = ({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) => {
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
        {modal}
      </body>
    </html>
  )
}

export default RootLayout
