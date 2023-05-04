import React, { MouseEventHandler, ReactNode } from 'react'
import styles from './EditableContent.module.css'

const EditableContent = ({
  children,
  showIcon,
  onEditClick,
}: {
  children: ReactNode
  showIcon?: boolean
  onEditClick: MouseEventHandler<HTMLButtonElement>
}) => (
  <div className={styles.container}>
    <div>{children}</div>
    {showIcon && (
      <button
        type="button"
        className="fr-link"
        title="Editer"
        onClick={onEditClick}
      >
        <span className="fr-icon--sm fr-icon-edit-line" />
      </button>
    )}
  </div>
)

export default EditableContent
