'use client'

import { SaveResourceInCollectionDynamicModal } from '@app/web/components/Resource/SaveResourceInCollectionModal'
import { useIsMobile } from '@app/web/hooks/useIsMobile'
import Button from '@codegouvfr/react-dsfr/Button'
import type { ButtonProps } from '@codegouvfr/react-dsfr/src/Button'
import classNames from 'classnames'

const OpenSaveResourceInCollectionModalButton = ({
  resourceId,
  shareableLinkId,
  ...buttonProps
}: ButtonProps &
  ButtonProps.AsButton & {
    resourceId: string
    shareableLinkId?: string
  }) => {
  const open = SaveResourceInCollectionDynamicModal.useOpen()
  const isMobile = useIsMobile()
  return (
    <Button
      {...buttonProps}
      className={classNames(buttonProps.className, isMobile && 'fr-text--sm')}
      onClick={() =>
        open({ resourceId, shareableLinkId: shareableLinkId ?? null })
      }
      size={isMobile ? 'medium' : 'small'}
    />
  )
}

export default OpenSaveResourceInCollectionModalButton
