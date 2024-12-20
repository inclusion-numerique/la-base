'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import { useDsfrModalIsBound } from '@app/ui/hooks/useDsfrModalIsBound'
import { createToast } from '@app/ui/toast/createToast'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  CreateResourceDynamicModal,
  createResourceModalId,
} from '@app/web/components/Resource/CreateResourceModal'
import ResourceBaseRichRadio from '@app/web/components/Resource/ResourceBaseRichRadio'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  CreateResourceCommand,
  CreateResourceCommandClientPayloadValidation,
} from '@app/web/server/resources/feature/CreateResource'
import { CreateResource } from '@app/web/server/rpc/resource/createResource'
import {
  resourceDescriptionMaxLength,
  resourceTitleMaxLength,
} from '@app/web/server/rpc/resource/utils'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { getBasesFromSessionUser } from '@app/web/bases/getBasesFromSessionUser'

const titleInfo = (title?: string | null) =>
  `${title?.length ?? 0}/${resourceTitleMaxLength} caractères`
const descriptionInfo = (description?: string | null) =>
  `${description?.length ?? 0}/${resourceDescriptionMaxLength} caractères`

const defaultValues = {
  baseId: null,
}

const CreateResourceFormModal = ({ user }: { user: SessionUser }) => {
  // Step 0: Title and description
  // Step 1: Base selection ONLY if user has bases
  const [step, setStep] = useState(0)
  const router = useRouter()

  const createResourceIsInSearchParams =
    typeof useSearchParams()?.get('creer-une-ressource') === 'string'

  const modalIsBound = useDsfrModalIsBound(createResourceModalId)

  const { baseId } = CreateResourceDynamicModal.useState()

  const bases = getBasesFromSessionUser(user)

  // Auto open modal when create is in search params and the modal is bound
  useEffect(() => {
    if (createResourceIsInSearchParams && modalIsBound) {
      CreateResourceDynamicModal.open()
    }
  }, [createResourceIsInSearchParams, modalIsBound])

  const create = trpc.resource.create.useMutation()
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    setValue,
  } = useForm<CreateResourceCommand['payload']>({
    resolver: zodResolver(CreateResourceCommandClientPayloadValidation),
    defaultValues,
  })

  // Set form baseId based on state baseId
  useEffect(() => {
    setValue('baseId', baseId)
  }, [baseId, setValue])

  useModalVisibility(createResourceModalId, {
    onClosed: () => {
      reset(defaultValues)
      setStep(0)
    },
  })

  const { confirmLabel, canCreate } =
    step === 0
      ? {
          confirmLabel: 'Continuer',
          canCreate: false,
        }
      : {
          confirmLabel:
            bases.length === 0 ? "J'ai compris" : 'Commencer l’édition',
          canCreate: true,
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
      const created = await create.mutateAsync({
        name: 'CreateResource',
        payload: data,
      })
      router.push(`/ressources/${created.resource.slug}/editer`)
      router.refresh()
      createToast({
        priority: 'success',
        message: (
          <>
            La ressource <strong>{created.resource.title}</strong> a bien été
            créée
          </>
        ),
      })
      CreateResourceDynamicModal.close()
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, setError)
      setStep(0)
      throw mutationError
    }
  }

  const disabled = isSubmitting

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CreateResourceDynamicModal.Component
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
      </CreateResourceDynamicModal.Component>
    </form>
  )
}

export default withTrpc(CreateResourceFormModal)
