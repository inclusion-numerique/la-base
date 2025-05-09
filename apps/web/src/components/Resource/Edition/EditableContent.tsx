import type { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import Button from '@codegouvfr/react-dsfr/Button'
import React, { type MouseEventHandler, type ReactNode } from 'react'
import styles from './EditableContent.module.css'

const EditableContent = ({
  children,
  showIcon,
  iconText,
  onEditClick,
  'data-testid': dataTestId,
}: UiComponentProps & {
  children: ReactNode
  showIcon?: boolean
  iconText?: string
  onEditClick?: MouseEventHandler<HTMLButtonElement>
}) => (
  <div className={styles.container}>
    <div>{children}</div>
    {showIcon && (
      <Button
        type="button"
        title="Modifier"
        data-testid={dataTestId}
        iconId="fr-icon-edit-line"
        iconPosition="right"
        onClick={onEditClick}
        priority="secondary"
      >
        {iconText}
      </Button>
    )}
  </div>
)

export default EditableContent
