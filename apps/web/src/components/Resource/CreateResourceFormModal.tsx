'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  CreateResourceModal,
  closeCreateResourceModal,
  createResourceModalId,
  openCreateResourceModal,
} from '@app/web/components/Resource/CreateResourceModal'
import ResourceBaseRichRadio from '@app/web/components/Resource/ResourceBaseRichRadio'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useDsfrModalIsBound } from '@app/web/hooks/useDsfrModalIsBound'
import { useModalVisibility } from '@app/web/hooks/useModalVisibility'
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

  // Forward ref do not work with modal, we have to make a workaround with form ref
  // TODO Make an issue or contrib to react dsfr Modal component
  const formRef = useRef<HTMLFormElement>(null)
  const modalRef = useRef<HTMLDialogElement>()
  if (!modalRef.current) {
    // Will only execute while first form element render is done
    modalRef.current = formRef.current?.querySelector('dialog') ?? undefined
  }

  const createResourceIsInSearchParams =
    typeof useSearchParams()?.get('creer-une-ressource') === 'string'

  const modalIsBound = useDsfrModalIsBound(createResourceModalId)

  useEffect(() => {
    if (createResourceIsInSearchParams && modalIsBound) {
      openCreateResourceModal()
    }
  }, [createResourceIsInSearchParams, modalIsBound])

  const create = trpc.resource.create.useMutation()
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<CreateResourceCommand['payload']>({
    resolver: zodResolver(CreateResourceCommandClientPayloadValidation),
    defaultValues,
  })

  useModalVisibility(modalRef.current, {
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
            user.ownedBases.length === 0
              ? "J'ai compris"
              : 'Commencer l’édition',
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
      closeCreateResourceModal()
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, setError)
      setStep(0)
      throw mutationError
    }
  }

  const disabled = isSubmitting

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
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
