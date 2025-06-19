import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import { getProfilePageCounts } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageCounts'
import type { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { ProfileRoles } from '@app/web/authorization/models/profileAuthorization'
import PrivateBox from '@app/web/components/PrivateBox'
import ProfileHeader, {
  headerSkipLink,
} from '@app/web/components/Profile/ProfileHeader'
import ProfileMenu from '@app/web/components/Profile/ProfileMenu'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { prismaClient } from '@app/web/prismaClient'
import { formatName } from '@app/web/server/rpc/user/formatName'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { type PropsWithChildren } from 'react'

export const generateMetadata = async ({
  params,
}: ProfilRouteParams): Promise<Metadata> => {
  const { slug } = await params

  const profile = await prismaClient.user.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      isPublic: true,
    },
  })
  if (!profile) {
    notFound()
  }

  return {
    title: metadataTitle(
      (profile.name && formatName(profile.name)) || 'Profil',
    ),
    robots: profile.isPublic ? undefined : 'noindex, nofollow',
  }
}

const ProfileLayout = async ({
  params,
  children,
}: PropsWithChildren<ProfilRouteParams>) => {
  const { slug } = await params
  const {
    profile,
    user,
    authorization: { hasPermission, hasRole },
  } = await getProfilePageContext(slug)

  if (!profile.slug) return

  const { resourcesCount, followsCount, collectionsCount, basesCount } =
    await getProfilePageCounts(profile.slug)

  const canView = hasPermission('ReadProfileData')
  const canWrite = hasPermission('WriteProfile')
  const isOwner = hasRole(ProfileRoles.ProfileOwner)

  if (!canView) {
    return (
      <>
        <SkipLinksPortal links={[headerSkipLink, ...defaultSkipLinks]} />
        <ProfileHeader
          profile={profile}
          resourcesCount={resourcesCount}
          user={user}
          canWrite={canWrite}
          isOwner={isOwner}
        />
        <PrivateBox type="Profil" />
      </>
    )
  }
  return (
    <>
      <SkipLinksPortal links={[headerSkipLink, ...defaultSkipLinks]} />
      <ProfileHeader
        profile={profile}
        canWrite={canWrite}
        isOwner={isOwner}
        resourcesCount={resourcesCount}
        user={user}
      />
      <main id={contentId} className="fr-overflow-hidden">
        <ProfileMenu
          profile={profile}
          resourcesCount={resourcesCount}
          isOwner={isOwner}
          basesCount={basesCount}
          collectionsCount={collectionsCount.total}
          followsCount={followsCount.total}
        />
        <div className="fr-container fr-container--medium fr-mb-24w">
          {children}
        </div>
      </main>
    </>
  )
}

export default ProfileLayout
