import { notFound, redirect } from 'next/navigation'
import React from 'react'
import Header from '@app/web/components/Profile/Header'
import Menu from '@app/web/components/Profile/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProfilePageQuery } from '@app/web/server/profiles/getProfile'
import { getProfileResources } from '@app/web/server/resources/getResourcesList'
import { getProfileBasesCount } from '@app/web/server/bases/getBasesList'
import EmptyResources from '@app/web/components/Profile/EmptyResources'
import Resources from '@app/web/components/Resource/List/Resources'

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/profils/${params.slug}`)
  }

  const profile = await getProfilePageQuery(decodeURI(params.slug))
  if (!profile) {
    notFound()
  }

  const [resources, basesCount] = await Promise.all([
    getProfileResources(profile.id, user),
    getProfileBasesCount(profile.id, user),
  ])

  const isConnectedUser = profile.id === user.id
  return (
    <>
      <Header
        profile={profile}
        isConnectedUser={isConnectedUser}
        resourcesCount={resources.length}
      />
      <Menu
        profile={profile}
        resourcesCount={resources.length}
        basesCount={basesCount}
        currentPage="/"
      />
      <div className="fr-container fr-mb-4w">
        {resources.length === 0 ? (
          <EmptyResources isConnectedUser={isConnectedUser} />
        ) : (
          <Resources resources={resources} user={user} />
        )}
      </div>
    </>
  )
}

export default ProfilePage
