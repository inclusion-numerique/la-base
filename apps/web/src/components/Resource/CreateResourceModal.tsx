'use client'

import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import { useIsMobile } from '@app/web/hooks/useIsMobile'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import React from 'react'

export const CreateResourceDynamicModal = createDynamicModal({
  id: 'create-resource',
  isOpenedByDefault: false,
  initialState: {
    baseId: null as string | null,
  },
})

export const createResourceModalId =
  CreateResourceDynamicModal.buttonProps['aria-controls']

export const CreateResourceButton = ({
  className,
  titleClassName,
  baseId,
  'data-testid': dataTestid,
  iconPosition = 'left',
}: {
  className?: string
  titleClassName?: string
  baseId: string | null
  'data-testid'?: string
  iconPosition?: 'left' | 'right'
}) => {
  const open = CreateResourceDynamicModal.useOpen()

  const onClick = () => open({ baseId })

  return (
    <Button
      type="button"
      className={className}
      data-testid={dataTestid}
      onClick={onClick}
    >
      {iconPosition === 'left' && (
        <span
          className={classNames('ri-edit-box-line fr-mr-1w', titleClassName)}
          aria-hidden
        />
      )}
      Créer une ressource
      {iconPosition === 'right' && (
        <span
          className={classNames('ri-edit-box-line fr-ml-1w', titleClassName)}
          aria-hidden
        />
      )}
    </Button>
  )
}
