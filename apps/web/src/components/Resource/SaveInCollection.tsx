import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import CollectionMetaData from '../Collection/CollectionMetaData'
import styles from './SaveInBase.module.css'

const SaveInCollection = ({
  collection,
  resourceId,
  onClick,
  isLoading,
}: {
  collection: SessionUser['collections'][number]
  resourceId: string
  onClick: () => void
  isLoading: boolean
}) => (
  <div className={styles.container} data-testid="add-in-collection-section">
    <div className={styles.content}>
      <b>{collection.title}</b>
      <div className={styles.collections}>
        <CollectionMetaData
          collection={collection}
          count={collection.resources.length}
        />
      </div>
    </div>
    {collection.resources.some((resource) => resource.id === resourceId) ? (
      <Button
        disabled
        priority="secondary"
        iconId="fr-icon-check-line"
        nativeButtonProps={{
          'data-testid': 'added-in-collection-button',
        }}
      >
        Déjà ajouté
      </Button>
    ) : (
      <Button
        priority="secondary"
        onClick={onClick}
        className={isLoading ? 'fr-btn--loading' : ''}
        disabled={isLoading}
        nativeButtonProps={{
          'data-testid': 'add-in-collection-button',
        }}
      >
        Ajouter
      </Button>
    )}
  </div>
)

export default SaveInCollection
