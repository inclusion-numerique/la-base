import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import type { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import ProfileBasesPage from '@app/web/features/profil/base/ProfileBasesPage'
import { getProfileBases } from '@app/web/server/bases/getBasesList'
import React from 'react'

const Page = async ({ params }: ProfilRouteParams) => {
  const { slug } = await params
  // Auth and profile has been checked in layout
  const {
    profile,
    user,
    authorization: { hasPermission, hasRole },
  } = await getProfilePageContext(slug)

  const bases = await getProfileBases(profile.id, user)
  const isOwner = hasRole('ProfileOwner')
  const canWrite = hasPermission('WriteProfile')

  return (
    <ProfileBasesPage
      profile={profile}
      bases={bases}
      user={user}
      isOwner={isOwner}
      canWrite={canWrite}
    />
  )
}

export default Page
