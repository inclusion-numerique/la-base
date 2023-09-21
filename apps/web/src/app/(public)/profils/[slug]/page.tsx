import { notFound } from 'next/navigation'
import React from 'react'
import Header from '@app/web/components/Profile/Header'
import Menu from '@app/web/components/Profile/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProfilePageQuery } from '@app/web/server/profiles/getProfile'
import { getProfileResources } from '@app/web/server/resources/getResourcesList'
import { getProfileBasesCount } from '@app/web/server/bases/getBasesList'
import EmptyResources from '@app/web/components/Profile/EmptyResources'
import Resources from '@app/web/components/Resource/List/Resources'
import { filterAccess } from '@app/web/server/profiles/authorization'
import PrivateBox from '@app/web/components/PrivateBox'

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const profile = await getProfilePageQuery(decodeURI(params.slug))
  if (!profile) {
    notFound()
  }

  const [resources, basesCount] = await Promise.all([
    getProfileResources(profile.id, user),
    getProfileBasesCount(profile.id, user),
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
        currentPage="/"
      />
      <div className="fr-container fr-mb-4w">
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
