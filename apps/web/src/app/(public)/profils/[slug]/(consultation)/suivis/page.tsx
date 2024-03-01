import React from 'react'
import { notFound } from 'next/navigation'
import {
  getProfileBaseFollows,
  getProfileProfileFollows,
} from '@app/web/server/follows/getFollowsList'
import FollowsList from '@app/web/components/Follows/FollowsList'
import type { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'

const ProfileSuivisPage = async ({ params }: ProfilRouteParams) => {
  // Auth and profile has been checked in layout
  const {
    profile,
    user,
    authorization: { hasRole },
  } = await getProfilePageContext(params.slug)

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
