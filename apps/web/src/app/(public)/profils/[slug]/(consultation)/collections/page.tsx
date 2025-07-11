import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import type { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import { ProfileRoles } from '@app/web/authorization/models/profileAuthorization'
import Collections from '@app/web/components/Collection/List/Collections'
import EmptyBox from '@app/web/components/EmptyBox'
import { getProfileCollections } from '@app/web/server/collections/getCollectionsList'
import { getProfileSavedCollections } from '@app/web/server/collections/getSavedCollectionsList'
import Link from 'next/link'
import React from 'react'

const ProfileCollectionsPage = async ({ params }: ProfilRouteParams) => {
  const { slug } = await params
  const {
    profile,
    user,
    authorization: { hasRole, hasPermission },
  } = await getProfilePageContext(slug)

  const [collections, savedCollections] = await Promise.all([
    getProfileCollections(profile.id, user),
    getProfileSavedCollections(profile.id, user),
  ])

  const isOwner = hasRole(ProfileRoles.ProfileOwner)
  const canWrite = hasPermission('WriteProfile')

  return (
    <Collections
      user={user}
      collections={collections}
      isOwner={isOwner}
      savedCollections={savedCollections.map(({ collection }) => collection)}
      withCreation={canWrite}
      collectionsLabel={isOwner ? 'Mes collections' : 'Collections'}
      emptyBox={
        canWrite ? (
          <EmptyBox title="Vous n’avez pas crée de collections" titleAs="h3">
            Créez une collection directement associée à votre profil et elle
            apparaîtra ici.
            <Link
              className="fr-btn fr-btn--primary fr-mt-4w"
              href="/collections/creer"
            >
              <span className="ri-folder-add-line fr-mr-1w" />
              Créer une collection
            </Link>
          </EmptyBox>
        ) : (
          <EmptyBox title="Ce profil n’a pas créé de collections" titleAs="h3">
            Revenez plus tard ou suivez ce profil afin d’être tenu informé de
            ses prochaines publications.
          </EmptyBox>
        )
      }
    />
  )
}

export default ProfileCollectionsPage
