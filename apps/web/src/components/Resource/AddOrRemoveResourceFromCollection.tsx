import type { SessionUser } from '@app/web/auth/sessionUser'
import IconInSquare from '@app/web/components/IconInSquare'
import { useIsMobile } from '@app/web/hooks/useIsMobile'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import React from 'react'
import CollectionMetaData from '../Collection/CollectionMetaData'
import styles from './SaveResourceInCollectionModal.module.css'

const AddOrRemoveResourceFromCollection = ({
  collection,
  resourceId,
  onAdd,
  onRemove,
  disabled,
  loading,
  withPrivacyTag,
}: {
  collection: SessionUser['collections'][number]
  resourceId: string
  onAdd: (collectionId: string) => void
  onRemove: (collectionId: string) => void
  loading?: boolean
  disabled?: boolean
  withPrivacyTag: boolean
}) => {
  const isMobile = useIsMobile()
  const iconSize = isMobile ? 'small' : 'medium'
  const isFavoriteCollection = collection.isFavorites
  const iconInSquareProps = {
    size: iconSize,
    iconId: isFavoriteCollection ? 'ri-heart-line' : 'ri-folder-2-line',
    iconClassName: isFavoriteCollection ? styles.favoriteText : undefined,
    background: isFavoriteCollection
      ? 'fr-background-alt--pink-tuile'
      : undefined,
  } as const

  return (
    <div className={styles.container} data-testid="add-in-collection-section">
      <div className="fr-flex fr-flex-gap-6v fr-align-items-center">
        <IconInSquare {...iconInSquareProps} />
        <div className={styles.content}>
          <b>{collection.title}</b>
          <div className={styles.collections}>
            {collection.slug && (
              <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
                <CollectionMetaData
                  withPrivacyTag={withPrivacyTag}
                  collection={{
                    title: collection.title,
                    id: collection.id,
                    slug: collection.slug,
                    isFavorites: collection.isFavorites,
                    isPublic: collection.isPublic,
                    created: collection.created,
                    updated: collection.updated,
                  }}
                  count={collection.resources.length}
                  context="contextModal"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {collection.resources.some(
        (collectionResource) => collectionResource.resourceId === resourceId,
      ) ? (
        <Button
          priority="tertiary"
          onClick={() => onRemove(collection.id)}
          className={classNames(loading && 'fr-btn--loading', styles.btnIcon)}
          disabled={disabled}
          type="button"
          nativeButtonProps={{
            tabIndex: 1,
            'data-testid': 'added-in-collection-button',
          }}
        >
          <span className="fr-hidden fr-unhidden-md">Déjà ajouté</span>
          <span className="fr-icon-check-line fr-icon--sm fr-pl-md-2v" />
        </Button>
      ) : (
        <Button
          priority="secondary"
          onClick={() => onAdd(collection.id)}
          className={classNames(loading && 'fr-btn--loading', styles.btnIcon)}
          disabled={disabled}
          type="button"
          nativeButtonProps={{
            tabIndex: 1,
            'data-testid': 'add-in-collection-button',
          }}
        >
          <span className="fr-icon-add-line fr-icon--sm fr-hidden-md" />
          <span className="fr-hidden fr-unhidden-md">Ajouter</span>
        </Button>
      )}
    </div>
  )
}

export default AddOrRemoveResourceFromCollection
