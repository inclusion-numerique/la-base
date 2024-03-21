import React, { PropsWithChildren } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'

const DeleteButton = ({
  children,
  disabled,
  onRemove,
}: PropsWithChildren<{
  disabled?: boolean
  onRemove: () => void
}>) => (
  <Button
    disabled={disabled}
    type="button"
    priority="tertiary no outline"
    iconId="fr-icon-delete-line"
    iconPosition="right"
    onClick={onRemove}
  >
    {children}
  </Button>
)

export default DeleteButton
