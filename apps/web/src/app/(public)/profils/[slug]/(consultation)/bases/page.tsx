import React from 'react'
import { getProfileBases } from '@app/web/server/bases/getBasesList'
import Bases from '@app/web/components/Base/List/Bases'
import EmptyBases from '@app/web/components/Base/List/EmptyBases'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'

const ProfileBasesPage = async ({ params }: ProfilRouteParams) => {
  // Auth and profile has been checked in layout
  const {
    profile,
    user,
    authorization: { hasPermission, hasRole },
  } = await getProfilePageContext(params.slug)

  const bases = await getProfileBases(profile.id, user)

  const canWrite = hasPermission('WriteProfile')

  return bases.length === 0 ? (
    <EmptyBases canWrite={canWrite} isOwner={hasRole('ProfileOwner')} />
  ) : (
    <Bases user={user} bases={bases} canWrite={canWrite} />
  )
}

export default ProfileBasesPage
