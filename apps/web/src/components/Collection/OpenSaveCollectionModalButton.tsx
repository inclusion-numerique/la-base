'use client'

import { SaveCollectionDynamicModal } from '@app/web/components/Collection/SaveCollectionModal'
import Button from '@codegouvfr/react-dsfr/Button'
import type { ButtonProps } from '@codegouvfr/react-dsfr/src/Button'
import classNames from 'classnames'

const OpenSaveCollectionModalButton = ({
  collectionId,
  context,
  buttonTitle,
  iconId,
  ...buttonProps
}: ButtonProps.Common &
  ButtonProps.AsButton & {
    collectionId: string
    context: 'view' | 'card' | 'contextModal'
    buttonTitle?: string
    iconId: string
  }) => {
  const open = SaveCollectionDynamicModal.useOpen()
  return (
    <Button {...buttonProps} onClick={() => open({ collectionId })}>
      <span className={classNames(context === 'view' && 'fr-mr-1w', iconId)} />
      {buttonTitle}
    </Button>
  )
}

export default OpenSaveCollectionModalButton
