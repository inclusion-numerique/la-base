import React from 'react'
import { getProfileResources } from '@app/web/server/resources/getResourcesList'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import EmptyProfileResources from '@app/web/components/Profile/EmptyProfileResources'
import Resources from '@app/web/components/Resource/List/Resources'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import {
  ProfilePermissions,
  ProfileRoles,
} from '@app/web/authorization/models/profileAuthorization'
import { applyDraft } from '@app/web/utils/resourceDraft'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'

const ProfilePage = async ({ params }: ProfilRouteParams) => {
  // Auth and profile has been checked in layout
  const { profile, user, authorization } = await getProfilePageContext(
    params.slug,
  )

  const resources = await getProfileResources(profile.id, user)

  const canWrite = authorization.hasPermission(ProfilePermissions.WriteProfile)
  const isOwner = authorization.hasRole(ProfileRoles.ProfileOwner)

  // Array of resources with their draft if they are in draft state
  const ressourcesAndDrafts = await Promise.all(
    resources.map((ressource) =>
      // Only fetch draft if the resource is in draft state (not published)
      ressource.published
        ? { ressource, draft: null }
        : getResourceProjectionWithContext({
            slug: decodeURI(ressource.slug),
          }).then((draft) => ({
            ressource,
            draft,
          })),
    ),
  )

  // Apply draft to resource if it exists
  const ressourcesWithAppliedDraft = ressourcesAndDrafts
    .map(({ ressource, draft }) =>
      draft ? applyDraft(ressource, draft) : ressource,
    )
    .filter(isDefinedAndNotNull)

  return ressourcesWithAppliedDraft.length === 0 ? (
    <EmptyProfileResources canWrite={canWrite} isOwner={isOwner} />
  ) : (
    <Resources
      resources={ressourcesWithAppliedDraft}
      canWrite={canWrite}
      user={user}
      baseId={null}
    />
  )
}

export default ProfilePage
