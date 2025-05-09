import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import type { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import Bases from '@app/web/components/Base/List/Bases'
import EmptyBases from '@app/web/components/Base/List/EmptyBases'
import { getProfileBases } from '@app/web/server/bases/getBasesList'
import React from 'react'

const ProfileBasesPage = async ({ params }: ProfilRouteParams) => {
  const { slug } = await params
  // Auth and profile has been checked in layout
  const {
    profile,
    user,
    authorization: { hasPermission, hasRole },
  } = await getProfilePageContext(slug)

  const bases = await getProfileBases(profile.id, user)

  const canWrite = hasPermission('WriteProfile')

  return bases.length === 0 ? (
    <EmptyBases canWrite={canWrite} isOwner={hasRole('ProfileOwner')} />
  ) : (
    <Bases user={user} bases={bases} canWrite={canWrite} />
  )
}

export default ProfileBasesPage
