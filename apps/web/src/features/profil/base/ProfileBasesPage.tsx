import { SessionUser } from '@app/web/auth/sessionUser'
import ProfileBases from '@app/web/features/profil/base/components/ProfileBases'
import EmptyBases from '@app/web/features/profil/base/components/ProfileEmptyBases'
import { ProfileBasesList } from '@app/web/server/bases/getBasesList'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import React from 'react'

interface ProfileBasesPageProps {
  profile: ProfilePageData
  bases: ProfileBasesList
  user: SessionUser | null
  isOwner: boolean
  canWrite: boolean
}

const ProfileBasesPage = async ({
  profile,
  bases,
  user,
  isOwner,
  canWrite,
}: ProfileBasesPageProps) => {
  return bases.length === 0 ? (
    <EmptyBases canWrite={canWrite} isOwner={isOwner} />
  ) : (
    <ProfileBases
      user={user}
      bases={bases}
      canWrite={canWrite}
      isOwner={isOwner}
      profile={profile}
    />
  )
}

export default ProfileBasesPage
