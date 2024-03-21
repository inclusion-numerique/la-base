import React, { PropsWithChildren } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'

const CropButton = ({
  children,
  disabled,
  onCrop,
}: PropsWithChildren<{
  disabled?: boolean
  onCrop: () => void
}>) => (
  <Button
    disabled={disabled}
    type="button"
    priority="tertiary no outline"
    iconId="fr-icon-crop-line"
    iconPosition="right"
    onClick={onCrop}
  >
    {children}
  </Button>
)

export default CropButton
