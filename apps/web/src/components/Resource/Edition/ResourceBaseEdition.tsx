'use client'

import type { SessionUser } from '@app/web/auth/sessionUser'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import ResourceBaseRichRadio from '@app/web/components/Resource/ResourceBaseRichRadio'
import {
  type ChangeBaseCommand,
  ChangeBaseCommandValidation,
} from '@app/web/server/resources/feature/ChangeBase'
import type { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import EditableContent from './EditableContent'

const { Component: BaseModal, open: openBaseModal } = createModal({
  id: 'chose-resource-base',
  isOpenedByDefault: false,
})

const ResourceBaseEdition = ({
  resource,
  user,
  sendCommand,
  children,
  iconText,
}: {
  resource: ResourceProjectionWithContext
  user: SessionUser
  sendCommand: SendCommand
  children?: ReactNode
  iconText?: string
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
      if (data.payload.baseId === resource.baseId) {
        // No-op on same base selected
        return
      }
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
      iconText={iconText}
    >
      {children ||
        (!!resource.createdBy && (
          <OwnershipInformation
            user={resource.createdBy}
            base={resource.base}
            attributionWording={
              resource.published ? 'resource' : 'draft-resource'
            }
          />
        ))}
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
              nativeButtonProps: {
                'data-testid': 'validate-base-button',
              },
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

export default ResourceBaseEdition
