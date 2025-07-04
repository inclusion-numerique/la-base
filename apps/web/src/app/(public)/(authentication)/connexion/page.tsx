import SigninPanel from '@app/web/app/(public)/(authentication)/connexion/SigninPanel'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import type { LoginSearchParams } from '@app/web/security/login'
import { getServerUrl } from '@app/web/utils/baseUrl'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Connexion'),
}

const SigninPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string } & LoginSearchParams>
}) => {
  const { error, suivant, intention } = await searchParams
  const user = await getSessionUser()

  const callbackUrl = suivant ?? '/connexion/suivant'

  if (user) {
    redirect(getServerUrl(callbackUrl))
  }

  return (
    <>
      <SkipLinksPortal />
      <Breadcrumbs className="fr-mb-0" currentPage="Connexion" />
      <div className="fr-container fr-container--narrow">
        <SigninPanel
          intent={intention}
          error={error}
          callbackUrl={callbackUrl}
        />
      </div>
    </>
  )
}

export default SigninPage
