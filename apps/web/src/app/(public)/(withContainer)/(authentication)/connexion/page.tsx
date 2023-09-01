import { Route } from 'next'
import { redirect } from 'next/navigation'
import SigninPanel from '@app/web/app/(public)/(withContainer)/(authentication)/connexion/SigninPanel'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getServerUrl } from '@app/web/utils/baseUrl'

export const revalidate = 0

const SigninPage = async ({
  searchParams: { error, suivant } = {},
}: {
  searchParams?: { error?: string; suivant?: Route }
}) => {
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl(suivant ?? '/'))
  }

  const callbackUrl = suivant ?? '/'

  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <SigninPanel error={error} callbackUrl={callbackUrl} />
    </>
  )
}

export default SigninPage
