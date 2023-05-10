import React, { MouseEventHandler, ReactNode } from 'react'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import Button from '@codegouvfr/react-dsfr/Button'
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
      <Button
        title="Editer"
        data-testid={dataTestId}
        iconId="fr-icon-edit-line"
        size="small"
        onClick={onEditClick}
        priority="tertiary no outline"
      />
    )}
  </div>
)

export default EditableContent
