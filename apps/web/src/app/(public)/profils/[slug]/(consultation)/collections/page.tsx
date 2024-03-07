import Link from 'next/link'
import React from 'react'
import { getProfileCollections } from '@app/web/server/collections/getCollectionsList'
import Collections from '@app/web/components/Collection/List/Collections'
import EmptyBox from '@app/web/components/EmptyBox'
import { getProfileSavedCollections } from '@app/web/server/collections/getSavedCollectionsList'
import type { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'

const ProfileCollectionsPage = async ({ params }: ProfilRouteParams) => {
  const {
    profile,
    user,
    authorization: { hasRole, hasPermission },
  } = await getProfilePageContext(params.slug)

  const [collections, savedCollections] = await Promise.all([
    getProfileCollections(profile.id, user),
    getProfileSavedCollections(profile.id, user),
  ])

  const isOwner = hasRole('ProfileOwner')
  const canWrite = hasPermission('WriteProfile')

  return (
    <Collections
      user={user}
      collections={collections}
      savedCollections={savedCollections.map(({ collection }) => collection)}
      withCreation={canWrite}
      collectionsLabel={isOwner ? 'Mes collections' : 'Collections du profil'}
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
      emptySavedBox={
        isOwner ? (
          <EmptyBox
            title="Vous n’avez pas enregistré de collections"
            titleAs="h3"
          >
            Enregistrez la collection de quelqu’un d’autre et elle apparaîtra
            ici.
          </EmptyBox>
        ) : (
          <EmptyBox
            title="Ce profil n’a pas enregistré de collections"
            titleAs="h3"
          >
            Revenez plus tard ou suivez ce profil afin d’être tenu informé de
            ses prochaines publications.
          </EmptyBox>
        )
      }
    />
  )
}

export default ProfileCollectionsPage
