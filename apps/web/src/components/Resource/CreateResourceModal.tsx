/* eslint react/jsx-props-no-spreading: off */
import React from 'react'
import { createModal } from '@codegouvfr/react-dsfr/Modal'

export const {
  Component: CreateResourceModal,
  open: openCreateResourceModal,
  close: closeCreateResourceModal,
  buttonProps: createResourceModalNativeButtonProps,
} = createModal({
  id: 'createResource',
  isOpenedByDefault: false,
})

export const createResourceModalId =
  createResourceModalNativeButtonProps['aria-controls']

export const CreateResourceButton = () => (
  <button
    type="button"
    className="fr-btn fr-icon-edit-box-line"
    {...createResourceModalNativeButtonProps}
  >
    Créer une ressource
  </button>
)
