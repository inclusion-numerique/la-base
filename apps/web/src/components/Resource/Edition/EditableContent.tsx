import React, { MouseEventHandler, ReactNode } from 'react'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import styles from './EditableContent.module.css'

const EditableContent = ({
  children,
  showIcon,
  onEditClick,
  'data-testid': dataTestId,
}: UiComponentProps & {
  children: ReactNode
  showIcon?: boolean
  onEditClick?: MouseEventHandler<HTMLButtonElement>
}) => (
  <div className={styles.container}>
    <div>{children}</div>
    {showIcon && (
      <button
        data-testid={dataTestId}
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
