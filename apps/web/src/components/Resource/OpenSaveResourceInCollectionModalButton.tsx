'use client'

import { SaveResourceInCollectionDynamicModal } from '@app/web/components/Resource/SaveResourceInCollectionModal'
import Button from '@codegouvfr/react-dsfr/Button'
import type { ButtonProps } from '@codegouvfr/react-dsfr/src/Button'

const OpenSaveResourceInCollectionModalButton = ({
  resourceId,
  ...buttonProps
}: ButtonProps &
  ButtonProps.AsButton & {
    resourceId: string
  }) => {
  const open = SaveResourceInCollectionDynamicModal.useOpen()

  return <Button {...buttonProps} onClick={() => open({ resourceId })} />
}

export default OpenSaveResourceInCollectionModalButton
