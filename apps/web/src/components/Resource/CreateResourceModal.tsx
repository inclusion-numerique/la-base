/* eslint react/jsx-props-no-spreading: off */

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import React from 'react'

export const {
  CreateResourceModal,
  openCreateResourceModal,
  closeCreateResourceModal,
  createResourceModalNativeButtonProps,
} = createModal({
  name: 'createResource',
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
