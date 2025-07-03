import { Verify } from '@app/web/app/(public)/(authentication)/connexion/verification/Verify'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getServerUrl } from '@app/web/utils/baseUrl'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Connexion'),
}

const VerifyPage = async () => {
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl('/'))
  }

  return (
    <>
      <SkipLinksPortal />
      <Breadcrumbs
        currentPage="Vérification"
        parents={[{ label: 'Connexion', linkProps: { href: '/connexion' } }]}
      />
      <div className="fr-container fr-container--narrow">
        <Verify />
      </div>
    </>
  )
}

export default VerifyPage
