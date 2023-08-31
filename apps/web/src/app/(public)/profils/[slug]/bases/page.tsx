import { notFound, redirect } from 'next/navigation'
import React from 'react'
import Header from '@app/web/components/Profile/Header'
import Menu from '@app/web/components/Profile/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProfilePageQuery } from '@app/web/server/profiles/getProfile'
import { getProfileResourcesCount } from '@app/web/server/resources/getResourcesList'
import { getProfileBases } from '@app/web/server/bases/getBasesList'
import Bases from '@app/web/components/Base/List/Bases'
import EmptyBases from '@app/web/components/Base/List/EmptyBases'

const ProfileBasesPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/profils/${params.slug}`)
  }

  const profile = await getProfilePageQuery(decodeURI(params.slug))
  if (!profile) {
    notFound()
  }

  const [resourcesCount, bases] = await Promise.all([
    getProfileResourcesCount(profile.id, user),
    getProfileBases(profile.id, user),
  ])

  const isConnectedUser = profile.id === user.id
  return (
    <>
      <Header
        profile={profile}
        isConnectedUser={isConnectedUser}
        resourcesCount={resourcesCount}
      />
      <Menu
        profile={profile}
        resourcesCount={resourcesCount}
        basesCount={bases.length}
        currentPage="/bases"
      />
      <div className="fr-container fr-mb-4w">
        {bases.length === 0 ? (
          <EmptyBases isConnectedUser={isConnectedUser} />
        ) : (
          <Bases bases={bases} />
        )}
      </div>
    </>
  )
}

export default ProfileBasesPage
