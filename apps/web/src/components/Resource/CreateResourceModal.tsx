'use client'

import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import { useIsMobile } from '@app/web/hooks/useIsMobile'
import Button from '@codegouvfr/react-dsfr/Button'
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
  baseId,
  'data-testid': dataTestid,
}: {
  className?: string
  baseId: string | null
  'data-testid'?: string
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
      <span
        className="fr-hidden-lg ri-edit-box-line fr-mr-1w fr-text-label--blue-france"
        aria-hidden
      />
      Créer une ressource
      <span
        className="fr-hidden fr-unhidden-lg ri-edit-box-line fr-ml-1w fr-text-label--blue-france"
        aria-hidden
      />
    </Button>
  )
}
