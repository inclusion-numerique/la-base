import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResourceBaseRichRadio from '@app/web/app/@modal/(.)creer-une-ressource/ResourceBaseRichRadio'
import { Resource } from '@app/web/server/resources'
import {
  EditResourceBase,
  EditResourceBaseValidation,
} from '@app/web/server/rpc/resource/editResource'
import EditableContent from './EditableContent'
import PublishedInInformation from '../PublishedInInformation'

const { BaseModal, openBaseModal } = createModal({
  name: 'base',
  isOpenedByDefault: false,
})

const BaseEdition = ({
  resource,
  user,
  updateResource,
}: {
  resource: Resource
  user: SessionUser
  updateResource: (data: EditResourceBase) => Promise<void>
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EditResourceBase>({
    resolver: zodResolver(EditResourceBaseValidation),
    defaultValues: {
      id: resource.id,
      baseId: resource.baseId,
    },
  })

  return (
    <EditableContent
      showIcon
      onEditClick={openBaseModal}
      data-testid="edit-base-button"
    >
      <PublishedInInformation resource={resource} />
      <BaseModal
        title="Où souhaitez-vous ajouter cette ressource ?"
        buttons={[
          {
            title: 'Annuler',
            priority: 'secondary',
            doClosesModal: true,
            children: 'Annuler',
          },
          {
            title: 'Valider',
            doClosesModal: true,
            children: 'Valider',
            onClick: handleSubmit(updateResource),
          },
        ]}
      >
        <ResourceBaseRichRadio
          control={control}
          path="baseId"
          user={user}
          disabled={isSubmitting}
        />
      </BaseModal>
    </EditableContent>
  )
}

export default BaseEdition
