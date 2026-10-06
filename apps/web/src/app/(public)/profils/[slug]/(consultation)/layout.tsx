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
import { isTrustedUserId } from '@app/web/features/indexation/db/getTrustedIds'
import { getUserContentRobots } from '@app/web/features/indexation/db/getUserContentRobots'
import { prismaClient } from '@app/web/prismaClient'
import { formatName } from '@app/web/server/rpc/user/formatName'
import { defaultSkipLinks } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type PropsWithChildren } from 'react'

export const generateMetadata = async ({
  params,
}: ProfilRouteParams): Promise<Metadata> => {
  const { slug } = await params

  const profile = await prismaClient.user.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
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
    robots: await getUserContentRobots({
      isPublic: profile.isPublic,
      isTrusted: () => isTrustedUserId(profile.id),
    }),
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

  const { resourcesCount, collectionsCount, basesCount } =
    await getProfilePageCounts(profile.slug)

  const canView = hasPermission('ReadProfileData')
  const canWrite = hasPermission('WriteProfile') && user?.role !== 'Admin'
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
      <div className="fr-overflow-x-clip">
        <ProfileMenu
          profile={profile}
          resourcesCount={resourcesCount}
          isOwner={isOwner}
          basesCount={basesCount}
          collectionsCount={collectionsCount}
        />
        <div className="fr-container fr-container--medium fr-mb-24w">
          {children}
        </div>
      </div>
    </>
  )
}

export default ProfileLayout
