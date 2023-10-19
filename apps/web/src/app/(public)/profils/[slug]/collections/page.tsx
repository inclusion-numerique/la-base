import { notFound } from 'next/navigation'
import React from 'react'
import Header from '@app/web/components/Profile/Header'
import Menu from '@app/web/components/Profile/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProfilePageQuery } from '@app/web/server/profiles/getProfile'
import { getProfileResourcesCount } from '@app/web/server/resources/getResourcesList'
import { getProfileCollections } from '@app/web/server/collections/getCollectionsList'
import { getProfileBasesCount } from '@app/web/server/bases/getBasesList'
import { filterAccess } from '@app/web/server/profiles/authorization'
import PrivateBox from '@app/web/components/PrivateBox'
import Collections from '@app/web/components/Collection/List/Collections'

const ProfileBasesPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const profile = await getProfilePageQuery(decodeURI(params.slug))
  if (!profile) {
    notFound()
  }

  const [resourcesCount, basesCount, collections] = await Promise.all([
    getProfileResourcesCount(profile.id, user),
    getProfileBasesCount(profile.id, user),
    getProfileCollections(profile.id, user),
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
        collectionsCount={collections.length}
        basesCount={basesCount}
        currentPage="/collections"
        isConnectedUser={authorizations.isUser}
      />
      <div className="fr-container fr-mb-4w">
        <Collections
          collections={collections}
          isConnectedUser={authorizations.isUser}
        />
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
