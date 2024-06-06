'use client'

import React from 'react'
import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import { ModalProps } from '@codegouvfr/react-dsfr/Modal'

export const DropdownMobileDynamicModal = createDynamicModal({
  id: 'dropdown-mobil-modal',
  isOpenedByDefault: false,
  initialState: {},
})

const DropdownMobileModal = ({
  title,
  buttons,
}: {
  title: string
  buttons?:
    | ModalProps.ActionAreaButtonProps
    | [ModalProps.ActionAreaButtonProps, ...ModalProps.ActionAreaButtonProps[]]
    | undefined
}) => (
  <DropdownMobileDynamicModal.Component title={title} buttons={buttons}>
    Hello World!
  </DropdownMobileDynamicModal.Component>
)

export default DropdownMobileModal
