'use client'

import React, { useEffect, useState } from 'react'
import {
  resourceDescriptionMaxLength,
  resourceTitleMaxLength,
} from '@app/web/server/rpc/resource/utils'
import { trpc } from '@app/web/trpc'
import { useForm } from 'react-hook-form'
import {
  CreateResource,
  createResourceValidation,
} from '@app/web/server/rpc/resource/createResource'
import { zodResolver } from '@hookform/resolvers/zod'
import { SessionUser } from '@app/web/auth/sessionUser'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { useRouter, useSearchParams } from 'next/navigation'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  closeCreateResourceModal,
  CreateResourceModal,
  createResourceModalId,
  openCreateResourceModal,
} from '@app/web/components/Resource/CreateResourceModal'
import ResourceBaseRichRadio from '@app/web/components/Resource/ResourceBaseRichRadio'
import { useDsfrModalIsBound } from '@app/web/hooks/useDsfrModalIsBound'

const titleInfo = (title: string | null) =>
  `${title?.length ?? 0}/${resourceTitleMaxLength} caractères`
const descriptionInfo = (description: string | null) =>
  `${description?.length ?? 0}/${resourceDescriptionMaxLength} caractères`

const CreateResourceFormModal = ({ user }: { user: SessionUser }) => {
  // Step 0: Title and description
  // Step 1: Base selection ONLY if user has bases
  const [step, setStep] = useState(0)
  const router = useRouter()

  const createResourceIsInSearchParams =
    typeof useSearchParams()?.get('creer-une-ressource') === 'string'

  const modalIsBound = useDsfrModalIsBound(createResourceModalId)

  useEffect(() => {
    if (createResourceIsInSearchParams && modalIsBound) {
      openCreateResourceModal()
    }
  }, [createResourceIsInSearchParams, modalIsBound])

  const createResource = trpc.resource.create.useMutation()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<CreateResource>({
    resolver: zodResolver(createResourceValidation),
    defaultValues: {
      baseId: null,
    },
  })

  const { confirmLabel, canCreate } =
    step === 1 || user.ownedBases.length === 0
      ? {
          confirmLabel: 'Commencer l’édition',
          canCreate: true,
        }
      : {
          confirmLabel: 'Continuer',
          canCreate: false,
        }
  const modalTitle =
    step === 0
      ? 'Créer une nouvelle ressource'
      : 'Où souhaitez-vous ajouter cette ressource ?'

  const onSubmit = async (data: CreateResource) => {
    if (isSubmitting) {
      return
    }
    if (!canCreate) {
      setStep(1)
      return
    }
    try {
      const created = await createResource.mutateAsync(data)
      router.push(`/ressources/${created.slug}/editer`)
      closeCreateResourceModal()
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, setError)
      setStep(0)
      throw mutationError
    }
  }

  const disabled = isSubmitting

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CreateResourceModal
        title={modalTitle}
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
            type: 'submit',
            priority: 'primary',
            title: confirmLabel,
            doClosesModal: false,
            children: confirmLabel,
            disabled,
          },
        ]}
      >
        {step === 0 ? (
          <>
            <InputFormField
              control={control}
              path="title"
              label="Titre de la ressource"
              disabled={disabled}
              info={titleInfo}
            />
            <InputFormField
              control={control}
              path="description"
              type="textarea"
              rows={5}
              label="Description courte de la ressource"
              hint="Décrivez en quelques mots votre ressource (nature, objectifs...). Cette description apparaîtra aussi dans les résultats du moteur de recherche."
              disabled={disabled}
              info={descriptionInfo}
            />
          </>
        ) : (
          <ResourceBaseRichRadio
            control={control}
            path="baseId"
            user={user}
            disabled={disabled}
          />
        )}
      </CreateResourceModal>
    </form>
  )
}

export default withTrpc(CreateResourceFormModal)
