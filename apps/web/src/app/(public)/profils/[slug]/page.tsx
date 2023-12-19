import { notFound } from 'next/navigation'
import React from 'react'
import Header from '@app/web/components/Profile/Header'
import Menu from '@app/web/components/Profile/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProfilePageQuery } from '@app/web/server/profiles/getProfile'
import { getProfileResources } from '@app/web/server/resources/getResourcesList'
import { getProfileBasesCount } from '@app/web/server/bases/getBasesList'
import { getProfileCollectionsCount } from '@app/web/server/collections/getCollectionsList'
import EmptyResources from '@app/web/components/Profile/EmptyResources'
import Resources from '@app/web/components/Resource/List/Resources'
import { filterAccess } from '@app/web/server/profiles/authorization'
import PrivateBox from '@app/web/components/PrivateBox'
import { getProfileFollowsCount } from '@app/web/server/follows/getFollowsList'

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const profile = await getProfilePageQuery(decodeURI(params.slug))
  if (!profile) {
    notFound()
  }

  const [resources, basesCount, collectionsCount, followsCount] =
    await Promise.all([
      getProfileResources(profile.id, user),
      getProfileBasesCount(profile.id, user),
      getProfileCollectionsCount(profile.id, user),
      user && user.id === profile.id
        ? getProfileFollowsCount(profile.id)
        : null,
    ])

  const authorizations = filterAccess(profile, user)
  return authorizations.authorized ? (
    <>
      <Header
        profile={authorizations.profile}
        isConnectedUser={authorizations.isUser}
        resourcesCount={resources.length}
      />
      <Menu
        profile={authorizations.profile}
        resourcesCount={resources.length}
        isConnectedUser={authorizations.isUser}
        basesCount={basesCount}
        collectionsCount={collectionsCount.total}
        followsCount={followsCount?.total ?? null}
        currentPage="/"
      />
      <div className="fr-container fr-container--medium fr-mb-4w">
        {resources.length === 0 ? (
          <EmptyResources isConnectedUser={authorizations.isUser} />
        ) : (
          <Resources
            resources={resources}
            isConnectedUser={authorizations.isUser}
            user={user}
          />
        )}
      </div>
    </>
  ) : (
    <>
      <Header
        profile={authorizations.profile}
        resourcesCount={resources.length}
      />
      <PrivateBox type="Profil" />
    </>
  )
}

export default ProfilePage
