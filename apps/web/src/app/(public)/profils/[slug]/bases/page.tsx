import { notFound } from 'next/navigation'
import React from 'react'
import Header from '@app/web/components/Profile/Header'
import Menu from '@app/web/components/Profile/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProfilePageQuery } from '@app/web/server/profiles/getProfile'
import { getProfileResourcesCount } from '@app/web/server/resources/getResourcesList'
import { getProfileCollectionsCount } from '@app/web/server/collections/getCollectionsList'
import { getProfileBases } from '@app/web/server/bases/getBasesList'
import Bases from '@app/web/components/Base/List/Bases'
import EmptyBases from '@app/web/components/Base/List/EmptyBases'
import { filterAccess } from '@app/web/server/profiles/authorization'
import PrivateBox from '@app/web/components/PrivateBox'

const ProfileBasesPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const profile = await getProfilePageQuery(decodeURI(params.slug))
  if (!profile) {
    notFound()
  }

  const [resourcesCount, bases, collectionsCount] = await Promise.all([
    getProfileResourcesCount(profile.id, user),
    getProfileBases(profile.id, user),
    getProfileCollectionsCount(profile.id, user),
  ])

  const authorizations = filterAccess(profile, user)
  return authorizations.authorized ? (
    <>
      <Header
        profile={authorizations.profile}
        isConnectedUser={authorizations.isUser}
        resourcesCount={resourcesCount}
      />
      <Menu
        profile={authorizations.profile}
        resourcesCount={resourcesCount}
        collectionsCount={collectionsCount}
        basesCount={bases.length}
        currentPage="/bases"
        isConnectedUser={authorizations.isUser}
      />
      <div className="fr-container fr-mb-4w">
        {bases.length === 0 ? (
          <EmptyBases isConnectedUser={authorizations.isUser} />
        ) : (
          <Bases bases={bases} isConnectedUser={authorizations.isUser} />
        )}
      </div>
    </>
  ) : (
    <>
      <Header
        profile={authorizations.profile}
        resourcesCount={resourcesCount}
      />
      <PrivateBox type="Profil" />
    </>
  )
}

export default ProfileBasesPage
