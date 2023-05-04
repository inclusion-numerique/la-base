import { getServerUrl } from '@app/web/utils/baseUrl'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SigninPanel from '@app/web/app/(public)/(authentication)/connexion/SigninPanel'
import { Route } from 'next'

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
