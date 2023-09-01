/* eslint react/jsx-props-no-spreading: off */
import React from 'react'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'

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

export const CreateResourceButton = ({ className }: { className?: string }) => (
  <button
    type="button"
    className={classNames(
      'fr-btn fr-btn--icon-left fr-icon-edit-box-line',
      className,
    )}
    {...createResourceModalNativeButtonProps}
  >
    Créer une ressource
  </button>
)
