import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { SessionUser, SessionUserBase } from '@app/web/auth/sessionUser'
import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import styles from './SaveCollectionModal.module.css'

const SaveCollection = ({
  base,
  user,
  collectionId,
  onAdd,
  onRemove,
  disabled,
  loading,
}: {
  collectionId: string
  base?: SessionUserBase
  user: SessionUser
  onAdd: (itemId: string) => void
  onRemove: (itemId: string) => void
  loading?: boolean
  disabled?: boolean
}) => (
  <div className={styles.container} data-testid="save-collection-section">
    <div className={styles.content}>
      <b> {base ? base.title : `${user.name} - Mes collections`}</b>
      <div className={styles.location}>
        <div>
          <span className="fr-icon-file-text-line fr-icon--sm fr-mr-1w" />
          <span>
            <b>
              {base
                ? base.savedCollections.length
                : user.savedCollections.length}
            </b>{' '}
            Collection
            {sPluriel(
              base
                ? base.savedCollections.length
                : user.savedCollections.length,
            )}
          </span>
        </div>
      </div>
    </div>
    {(base?.savedCollections ?? user.savedCollections).some(
      (savedCollection) => savedCollection.collectionId === collectionId,
    ) ? (
      <Button
        priority="tertiary"
        onClick={() => onRemove(base?.id ?? 'profile')}
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
        Déjà enregistrée
      </Button>
    ) : (
      <Button
        priority="secondary"
        onClick={() => onAdd(base?.id ?? 'profile')}
        className={loading ? 'fr-btn--loading' : ''}
        disabled={disabled}
        type="button"
        nativeButtonProps={{
          tabIndex: 1,
          'data-testid': 'add-in-collection-button',
        }}
      >
        Enregistrer
      </Button>
    )}
  </div>
)

export default SaveCollection
