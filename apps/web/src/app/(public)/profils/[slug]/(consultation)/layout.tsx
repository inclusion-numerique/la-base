import React, { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProfileHeader from '@app/web/components/Profile/ProfileHeader'
import PrivateBox from '@app/web/components/PrivateBox'
import type { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import { getProfilePageCounts } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageCounts'
import ProfileMenu from '@app/web/components/Profile/ProfileMenu'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const generateMetadata = async ({
  params: { slug },
}: ProfilRouteParams): Promise<Metadata> => {
  const profile = await prismaClient.user.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
    },
  })
  if (!profile) {
    notFound()
  }

  return {
    title: metadataTitle(profile.name || 'Profil'),
  }
}

const ProfileLayout = async ({
  params,
  children,
}: PropsWithChildren<ProfilRouteParams>) => {
  const { profile, user, authorizations } = await getProfilePageContext(
    params.slug,
  )

  if (!profile.slug) return

  const { resourcesCount, followsCount, collectionsCount, basesCount } =
    await getProfilePageCounts(profile.slug)

  if (!authorizations.authorized) {
    return (
      <>
        <ProfileHeader
          profile={authorizations.profile}
          resourcesCount={resourcesCount}
          user={user}
        />
        <PrivateBox type="Profil" />
      </>
    )
  }
  return (
    <>
      <ProfileHeader
        profile={authorizations.profile}
        isConnectedUser={authorizations.isUser}
        resourcesCount={resourcesCount}
        user={user}
      />
      <ProfileMenu
        profile={authorizations.profile}
        resourcesCount={resourcesCount}
        isConnectedUser={authorizations.isUser}
        basesCount={basesCount}
        collectionsCount={collectionsCount.total}
        followsCount={followsCount.total}
      />
      <div className="fr-container fr-container--medium fr-mb-50v">
        {children}
      </div>
    </>
  )
}

export default ProfileLayout
