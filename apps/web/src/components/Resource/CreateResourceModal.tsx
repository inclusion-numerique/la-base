/* eslint react/jsx-props-no-spreading: off */

'use client'

import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'

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

  return (
    <Button
      type="button"
      iconId="fr-icon-edit-box-line"
      className={className}
      data-testid={dataTestid}
      onClick={() => open({ baseId })}
    >
      Créer une ressource
    </Button>
  )
}
