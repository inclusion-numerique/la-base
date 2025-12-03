import { getSessionUser } from '@app/web/auth/getSessionUser'
import { redirect } from 'next/navigation'

const Page = async () => {
  const user = await getSessionUser()
  const isAdmin = user?.role === 'Admin' || user?.role === 'Support'
  if (isAdmin) {
    redirect('/administration/utilisateurs')
  } else {
    redirect('/administration/signalements')
  }
  return null
}

export default Page
