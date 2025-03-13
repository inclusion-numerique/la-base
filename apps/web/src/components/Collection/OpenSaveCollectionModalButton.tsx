'use client'

import { ButtonProps } from '@codegouvfr/react-dsfr/src/Button'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { SaveCollectionDynamicModal } from '@app/web/components/Collection/SaveCollectionModal'

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
