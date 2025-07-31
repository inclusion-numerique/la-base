import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import type { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import FollowsList from '@app/web/components/Follows/FollowsList'
import {
  getProfileBaseFollows,
  getProfileProfileFollows,
} from '@app/web/server/follows/getFollowsList'
import { notFound } from 'next/navigation'

const ProfileSuivisPage = async ({ params }: ProfilRouteParams) => {
  const { slug } = await params
  // Auth and profile has been checked in layout
  const {
    profile,
    user,
    authorization: { hasRole },
  } = await getProfilePageContext(slug)

  const [baseFollows, profileFollows] = await Promise.all([
    getProfileBaseFollows(profile.id),
    getProfileProfileFollows(profile.id),
  ])

  return hasRole('ProfileOwner') ? (
    <FollowsList
      user={user}
      profileFollows={profileFollows}
      baseFollows={baseFollows}
    />
  ) : (
    notFound()
  )
}

export default ProfileSuivisPage
