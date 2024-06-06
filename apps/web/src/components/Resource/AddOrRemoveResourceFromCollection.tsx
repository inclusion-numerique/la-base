import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import CollectionMetaData from '../Collection/CollectionMetaData'
import styles from './SaveResourceInCollectionModal.module.css'

const AddOrRemoveResourceFromCollection = ({
  user,
  collection,
  resourceId,
  onAdd,
  onRemove,
  disabled,
  loading,
}: {
  user: SessionUser | null
  collection: SessionUser['collections'][number]
  resourceId: string
  onAdd: (collectionId: string) => void
  onRemove: (collectionId: string) => void
  loading?: boolean
  disabled?: boolean
}) => (
  <div className={styles.container} data-testid="add-in-collection-section">
    <div className={styles.content}>
      <b>{collection.title}</b>
      <div className={styles.collections}>
        {collection.slug && (
          <CollectionMetaData
            user={user}
            collection={{
              id: collection.id,
              slug: collection.slug,
              isPublic: collection.isPublic,
            }}
            count={collection.resources.length}
            context="view"
          />
        )}
      </div>
    </div>
    {collection.resources.some(
      (collectionResource) => collectionResource.resourceId === resourceId,
    ) ? (
      <Button
        priority="tertiary"
        onClick={() => onRemove(collection.id)}
        className={loading ? 'fr-btn--loading' : ''}
        disabled={disabled}
        iconPosition="right"
        iconId="fr-icon-check-line"
        type="button"
        nativeButtonProps={{
          tabIndex: 1,
          'data-testid': 'added-in-collection-button',
        }}
      >
        Déjà ajouté
      </Button>
    ) : (
      <Button
        priority="secondary"
        onClick={() => onAdd(collection.id)}
        className={loading ? 'fr-btn--loading' : ''}
        disabled={disabled}
        type="button"
        nativeButtonProps={{
          tabIndex: 1,
          'data-testid': 'add-in-collection-button',
        }}
      >
        Ajouter
      </Button>
    )}
  </div>
)

export default AddOrRemoveResourceFromCollection
