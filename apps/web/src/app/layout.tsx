// setup.ts must be the first import for webpack css chunks to work properly
// eslint-disable-next-line import/order
import '@app/web/app/setup'
import Toaster from '@app/ui/toast/Toaster'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { Dsfr } from '@app/web/app/Dsfr'
import { EnvInformation } from '@app/web/app/EnvInformation'
import { Matomo } from '@app/web/app/Matomo'
import { PreloadResources } from '@app/web/app/PreloadResources'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import CreateResourceFormModal from '@app/web/components/Resource/CreateResourceFormModal'
import { setLink } from '@codegouvfr/react-dsfr/link'
import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { type PropsWithChildren } from 'react'

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
  robots: PublicWebAppConfig.isMain ? 'index, follow' : 'noindex, nofollow',
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
  description:
    'La plateforme collaborative de partage de ressources & communs numériques: Inclusion, environnement, culture, sécurité.... Inspirez-vous, produisez, diffusez, contribuez.',
  manifest: '/favicon/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#000091',
}

// Only load feedback modal lazyly, in a different chunk, on browser
const LazyFeedbackModal = dynamic(
  () => import('@app/web/components/Feedback/FeedbackModal'),
  { ssr: false },
)

const RootLayout = async ({ children }: PropsWithChildren) => {
  // Do we want to disable SSG for CSFR on this website ?
  // const nonce = headers().get('x-sde-script-nonce') ?? undefined
  const user = await getSessionUser()

  const nonce = undefined
  return (
    <html lang="fr" data-fr-theme="light" data-fr-scheme="light">
      <head>
        <link
          rel="preload"
          href="/images/spinner.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body>
        <PreloadResources />
        <Dsfr nonce={nonce} />
        <Matomo nonce={nonce} />
        <EnvInformation />
        {children}
        {user ? <CreateResourceFormModal user={user} /> : null}
        <Toaster />
        <LazyFeedbackModal />
      </body>
    </html>
  )
}

export default RootLayout
