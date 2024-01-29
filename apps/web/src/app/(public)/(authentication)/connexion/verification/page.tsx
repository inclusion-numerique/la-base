import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { Verify } from '@app/web/app/(public)/(authentication)/connexion/verification/Verify'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { metadataTitle } from '@app/web/app/metadataTitle'

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
      <Breadcrumbs
        currentPage="Vérification"
        parents={[{ label: 'Connexion', linkProps: { href: '/connexion' } }]}
      />
      <Verify />
    </>
  )
}

export default VerifyPage
