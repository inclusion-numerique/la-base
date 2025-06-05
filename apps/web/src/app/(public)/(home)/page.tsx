import { getSessionUser } from '@app/web/auth/getSessionUser'
import HomePage from '@app/web/features/home/HomePage'
import { getFeatured } from '@app/web/features/home/db/getFeatured'

export const revalidate = 0

const Page = async () => {
  const user = await getSessionUser()
  const featured = await getFeatured({ user })

  return <HomePage featured={featured} user={user} />
}

export default Page
