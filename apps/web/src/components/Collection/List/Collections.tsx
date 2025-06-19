import type { SessionUser } from '@app/web/auth/sessionUser'
import CollectionCard from '@app/web/components/Collection/Cards/CollectionCard'
import DeleteCollectionModal from '@app/web/components/Collection/DeleteCollection/DeleteCollectionModal'
import { ManageCollectionButton } from '@app/web/components/Collection/ManageCollectionButton'
import SaveCollectionModal from '@app/web/components/Collection/SaveCollectionModal'
import EmptyBox from '@app/web/components/EmptyBox'
import IconInSquare from '@app/web/components/IconInSquare'
import type { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import classNames from 'classnames'
import Link from 'next/link'
import React, { type ReactNode } from 'react'
import { CreateCollectionButton } from '../CreateCollectionButton'
import styles from './Collections.module.css'

const Collections = ({
  collections,
  savedCollections,
  withCreation,
  collectionsLabel,
  emptyBox,
  baseId,
  baseSlug,
  user,
  isOwner = false,
}: {
  user: SessionUser | null
  collections: CollectionListItem[]
  savedCollections: CollectionListItem[]
  collectionsLabel: string
  withCreation: boolean
  emptyBox?: ReactNode
  baseId?: string
  baseSlug?: string
  isOwner?: boolean
}) => {
  const favoriteCollection = collections.find((c) => c.isFavorites)
  const combinedCollections = [...collections, ...savedCollections]

  return (
    <div data-testid="collections-list">
      {combinedCollections.length > 0 ? (
        <>
          <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-reverse fr-mb-4w">
            <div className="fr-col-sm-auto fr-col-12">
              <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
                <IconInSquare iconId="ri-folder-2-line" />
                <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
                  {collectionsLabel} · {combinedCollections.length}
                </h2>
              </div>
            </div>
            {withCreation && (
              <div className="fr-flex fr-direction-sm-row fr-direction-column fr-align-items-center fr-flex-gap-2v fr-mb-5w fr-mb-md-0">
                <CreateCollectionButton
                  className={classNames(
                    styles.actionsButtons,
                    'fr-btn--secondary',
                  )}
                  baseId={baseId}
                  title={
                    baseId
                      ? 'Créer une collection de base'
                      : 'Créer une collection'
                  }
                />
                <ManageCollectionButton
                  className={classNames(
                    styles.actionsButtons,
                    'fr-btn--secondary',
                    'fr-hidden fr-unhidden-sm',
                  )}
                  baseSlug={baseSlug}
                />
              </div>
            )}
          </div>
          <div className={styles.tabCards}>
            {combinedCollections.map((collection) => (
              <CollectionCard
                user={user}
                collection={collection}
                key={collection.id}
                canWrite={isOwner || withCreation}
              />
            ))}
            {combinedCollections.length === 1 && !!favoriteCollection && (
              <EmptyBox className="fr-flex fr-justify-content-center">
                Créez une collection pour enregistrer et organiser des
                ressources.
                <Link href="/centre-d-aide/les-collections" className="fr-link">
                  En savoir plus
                </Link>
                <div className="fr-mt-4w">
                  <CreateCollectionButton />
                </div>
              </EmptyBox>
            )}
          </div>
        </>
      ) : (
        emptyBox
      )}
      {!!user && <SaveCollectionModal user={user} />}
      <DeleteCollectionModal />
    </div>
  )
}

export default Collections
