import React from 'react'
import classNames from 'classnames'
import { SessionUser } from '@app/web/auth/sessionUser'
import styles from './SaveInBase.module.css'

const SaveInBase = ({
  base,
  user,
  onClick,
}: {
  base?: SessionUser['bases'][number]['base']
  user: SessionUser
  onClick: () => void
}) => (
  <button
    className={styles.clickableContainer}
    onClick={onClick}
    type="button"
    data-testid="add-in-collection-bases"
  >
    <div className={styles.content}>
      <b>{base ? base.title : `${user.name} - Mes collections`}</b>
      <div className={styles.collections}>
        <div>
          <span className="fr-icon-folder-2-line fr-icon--sm" />{' '}
          {base ? base.collections.length : user.collections.length} Collections
        </div>
      </div>
    </div>
    <span
      className={classNames(
        'fr-icon-arrow-right-s-line',
        'fr-icon--sm',
        styles.arrow,
      )}
    />
  </button>
)

export default SaveInBase
