'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResourceBaseRichRadio from '@app/web/components/Resource/ResourceBaseRichRadio'
import {
  ChangeBaseCommand,
  ChangeBaseCommandValidation,
} from '@app/web/server/resources/feature/ChangeBase'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import type { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import type { Resource } from '@app/web/server/resources/getResource'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import PublishedInInformation from '../PublishedInInformation'
import EditableContent from './EditableContent'

const { BaseModal, openBaseModal } = createModal({
  name: 'base',
  isOpenedByDefault: false,
})

const BaseEdition = ({
  resource,
  user,
  sendCommand,
  draftBase,
  draftCreatedBy,
}: {
  resource: ResourceProjection
  user: SessionUser
  draftBase: Resource['base']
  draftCreatedBy: Resource['createdBy']
  sendCommand: (command: ResourceMutationCommand) => Promise<void>
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<ChangeBaseCommand>({
    resolver: zodResolver(ChangeBaseCommandValidation),
    defaultValues: {
      name: 'ChangeBase',
      payload: {
        resourceId: resource.id,
        baseId: resource.baseId,
      },
    },
  })
  const disabled = isSubmitting
  const onSubmit = async (data: ChangeBaseCommand) => {
    try {
      await sendCommand(data)
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, setError)
    }
  }

  return (
    <EditableContent
      showIcon
      onEditClick={openBaseModal}
      data-testid="edit-base-button"
    >
      <PublishedInInformation
        resource={{ base: draftBase, createdBy: draftCreatedBy }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseModal
          title="Où souhaitez-vous ajouter cette ressource ?"
          buttons={[
            {
              title: 'Annuler',
              priority: 'secondary',
              doClosesModal: true,
              children: 'Annuler',
              type: 'button',
              disabled,
            },
            {
              title: 'Valider',
              doClosesModal: true,
              children: 'Valider',
              type: 'submit',
              disabled,
            },
          ]}
        >
          <ResourceBaseRichRadio
            control={control}
            path="payload.baseId"
            user={user}
            disabled={isSubmitting}
          />
        </BaseModal>
      </form>
    </EditableContent>
  )
}

export default BaseEdition
