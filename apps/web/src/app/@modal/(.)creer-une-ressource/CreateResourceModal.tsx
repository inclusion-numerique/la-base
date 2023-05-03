'use client'

import LayoutModal from '@app/web/app/@modal/LayoutModal'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SessionUser } from '@app/web/auth/sessionUser'
import { useForm } from 'react-hook-form'
import {
  CreateResource,
  createResourceDescriptionMaxLength,
  createResourceTitleMaxLength,
  CreateResourceValidation,
} from '@app/web/server/rpc/resource/createResource'
import { zodResolver } from '@hookform/resolvers/zod'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import InputFormField from '@app/ui/components/Form/InputFormField'
import ResourceBaseRichRadio from '@app/web/app/@modal/(.)creer-une-ressource/ResourceBaseRichRadio'

const titleInfoText = (title: string | null) =>
  `${title?.length ?? 0}/${createResourceTitleMaxLength} caractères`
const descriptionInfoText = (description: string | null) =>
  `${description?.length ?? 0}/${createResourceDescriptionMaxLength} caractères`

const CreateResourceModal = ({ user }: { user: SessionUser }) => {
  const [step, setStep] = useState(0)
  const router = useRouter()

  // TODO Props for available user bases

  const createResource = trpc.resource.create.useMutation()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setError,
  } = useForm<CreateResource>({
    resolver: zodResolver(CreateResourceValidation),
    defaultValues: {
      // baseId: null,
      baseId: '93ed248d-962f-4f5f-a5cc-744c6ee7e23b',
    },
  })

  const { confirmLabel } =
    step === 1 || user.ownedBases.length === 0
      ? {
          confirmLabel: 'Commencer l’édition',
        }
      : {
          confirmLabel: 'Continuer',
        }

  const onSubmit = async (data: CreateResource) => {
    console.log('SUBMITING', data)
    if (step === 0) {
      setStep(1)
      return
    }
    try {
      const created = await createResource.mutateAsync(data)
      router.push(`/ressources/${created.slug}`)
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, setError)
      setStep(0)
    }
  }

  const disabled = isSubmitting

  const baseId = watch('baseId')
  console.log('BASE ID', baseId)

  return (
    <LayoutModal>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 ? (
          <div className="fr-modal__content">
            <h1 id="modal-title" className="fr-modal__title">
              Créer une ressource
            </h1>
            <InputFormField
              control={control}
              path="title"
              label="Titre de la ressource"
              disabled={disabled}
              infoText={titleInfoText}
            />
            <InputFormField
              control={control}
              path="description"
              type="textarea"
              rows={5}
              label="Description courte de la ressource"
              hint="Décrivez en quelques mots votre ressource (nature, objectifs...). Cette description apparaîtra aussi dans les résultats du moteur de recherche."
              disabled={disabled}
              infoText={descriptionInfoText}
            />
            <ResourceBaseRichRadio
              control={control}
              path="baseId"
              user={user}
              disabled={disabled}
            />
          </div>
        ) : (
          <div className="fr-modal__content">
            <h1 id="modal-title" className="fr-modal__title">
              Où souhaitez-vous ajouter cette ressource ?
            </h1>
            <ResourceBaseRichRadio
              control={control}
              path="baseId"
              user={user}
              disabled={disabled}
            />
          </div>
        )}
        <div className="fr-modal__footer">
          <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
            <li>
              <button type="submit" className="fr-btn">
                {confirmLabel}
              </button>
            </li>
            <li>
              <button
                type="button"
                className="fr-btn fr-btn--secondary"
                onClick={router.back}
              >
                Annuler
              </button>
            </li>
          </ul>
        </div>
      </form>
    </LayoutModal>
  )
}

export default withTrpc(CreateResourceModal)
