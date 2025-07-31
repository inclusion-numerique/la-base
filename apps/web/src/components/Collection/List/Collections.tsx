import CollectionCard from '@app/web/components/Collection/Cards/CollectionCard'
import DeleteCollectionModal from '@app/web/components/Collection/DeleteCollection/DeleteCollectionModal'
import { ManageCollectionButton } from '@app/web/components/Collection/ManageCollectionButton'
import EmptyBox from '@app/web/components/EmptyBox'
import IconInSquare from '@app/web/components/IconInSquare'
import type { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import classNames from 'classnames'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { CreateCollectionButton } from '../CreateCollectionButton'
import styles from './Collections.module.css'

const Collections = ({
  collections,
  withCreation,
  collectionsLabel,
  emptyBox,
  baseId,
  baseSlug,
  isOwner = false,
}: {
  collections: CollectionListItem[]
  collectionsLabel: string
  withCreation: boolean
  emptyBox?: ReactNode
  baseId?: string
  baseSlug?: string
  isOwner?: boolean
}) => {
  const favoriteCollection = collections.find((c) => c.isFavorites)

  return (
    <div data-testid="collections-list">
      {collections.length > 0 ? (
        <>
          <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-md-reverse fr-mb-6w">
            <div className="fr-col-sm-auto fr-col-12">
              <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
                <IconInSquare iconId="ri-folder-2-line" />
                <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
                  {collectionsLabel} · {collections.length}
                </h2>
              </div>
            </div>
            {withCreation && (
              <div
                className={classNames(
                  'fr-flex fr-direction-sm-row fr-direction-column fr-align-items-center fr-flex-gap-2v',
                  styles.actionsButtonsContainer,
                )}
              >
                <div
                  data-testid="create-collection-button"
                  className="fr-col-sm-auto fr-col-12 fr-mt-4w fr-mt-md-0"
                >
                  <CreateCollectionButton
                    className={classNames(
                      styles.actionsButtons,
                      'fr-btn--secondary',
                    )}
                    baseId={baseId}
                    title="Créer une collection"
                  />
                </div>
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
            {collections.map((collection) => (
              <CollectionCard
                collection={collection}
                key={collection.id}
                canWrite={isOwner || withCreation}
              />
            ))}
            {collections.length === 1 && !!favoriteCollection && (
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
      <DeleteCollectionModal />
    </div>
  )
}

export default Collections
