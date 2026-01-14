'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import { BaseJoinRequestDynamicModal } from './BaseJoinRequestFormModal'

export const BaseJoinRequestButton = ({
  size = 'medium',
}: {
  size?: 'small' | 'medium' | 'large'
}) => {
  const handleOpenModal = () => {
    BaseJoinRequestDynamicModal.open()
  }

  return (
    <Button priority="secondary" size={size} onClick={handleOpenModal}>
      <span className="ri-team-line fr-mr-1w" />
      Demander à rejoindre la base
    </Button>
  )
}
