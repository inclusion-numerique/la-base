'use client'

import { ButtonProps } from '@codegouvfr/react-dsfr/src/Button'
import Button from '@codegouvfr/react-dsfr/Button'
import { SaveResourceInCollectionDynamicModal } from '@app/web/components/Resource/SaveResourceInCollectionModal'

const OpenSaveResourceInCollectionModalButton = ({
  resourceId,
  ...buttonProps
}: ButtonProps &
  ButtonProps.AsButton & {
    resourceId: string
  }) => {
  const open = SaveResourceInCollectionDynamicModal.useOpen()

  return (
    <Button
      size="medium"
      {...buttonProps}
      onClick={() => open({ resourceId })}
    />
  )
}

export default OpenSaveResourceInCollectionModalButton
