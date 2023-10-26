/* eslint react/jsx-props-no-spreading: off */
import React from 'react'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'

export const CreateResourceModal = createModal({
  id: 'create-resource',
  isOpenedByDefault: false,
})

export const createResourceModalId =
  CreateResourceModal.buttonProps['aria-controls']

export const CreateResourceButton = ({ className }: { className?: string }) => (
  <button
    type="button"
    className={classNames(
      'fr-btn fr-btn--icon-left fr-icon-edit-box-line',
      className,
    )}
    {...CreateResourceModal.buttonProps}
  >
    Créer une ressource
  </button>
)
