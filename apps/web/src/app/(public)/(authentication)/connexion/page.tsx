import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import SigninPanel from '@app/web/app/(public)/(authentication)/connexion/SigninPanel'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { LoginSearchParams } from '@app/web/security/login'
import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Connexion'),
}

const SigninPage = async ({
  searchParams: { error, suivant, intention } = {},
}: {
  searchParams?: { error?: string } & LoginSearchParams
}) => {
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl(suivant ?? '/'))
  }

  const callbackUrl = suivant ?? '/'

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <Breadcrumbs currentPage="Connexion" />
      <main id={contentId}>
        <SigninPanel
          intent={intention}
          error={error}
          callbackUrl={callbackUrl}
        />
      </main>
    </>
  )
}

export default SigninPage
