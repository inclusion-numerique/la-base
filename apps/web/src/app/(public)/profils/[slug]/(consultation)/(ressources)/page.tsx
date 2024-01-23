import React from 'react'
import { getProfileResources } from '@app/web/server/resources/getResourcesList'
import EmptyProfileResources from '@app/web/components/Profile/EmptyProfileResources'
import Resources from '@app/web/components/Resource/List/Resources'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'

const ProfilePage = async ({ params }: ProfilRouteParams) => {
  // Auth and profile has been checked in layout
  const { profile, user, authorizations } = await getProfilePageContext(
    params.slug,
  )

  const resources = await getProfileResources(profile.id, user)

  return resources.length === 0 ? (
    <EmptyProfileResources isConnectedUser={authorizations.isUser} />
  ) : (
    <Resources
      resources={resources}
      isConnectedUser={authorizations.isUser}
      user={user}
      baseId={null}
    />
  )
}

export default ProfilePage
