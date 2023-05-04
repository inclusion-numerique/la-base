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
import InputFormField from '@app/ui/components/Form/InputFormField'
import ResourceBaseRichRadio from '@app/web/app/@modal/(.)creer-une-ressource/ResourceBaseRichRadio'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const titleInfo = (title: string | null) =>
  `${title?.length ?? 0}/${createResourceTitleMaxLength} caractères`
const descriptionInfo = (description: string | null) =>
  `${description?.length ?? 0}/${createResourceDescriptionMaxLength} caractères`

const CreateResourceModal = ({ user }: { user: SessionUser }) => {
  // Step 0: Title and description
  // Step 1: Base selection ONLY if user has bases
  const [step, setStep] = useState(0)

  const router = useRouter()

  const createResource = trpc.resource.create.useMutation()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<CreateResource>({
    resolver: zodResolver(CreateResourceValidation),
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
    if (!canCreate) {
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

  return (
    <LayoutModal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="fr-modal__content">
          <h1 id="modal-title" className="fr-modal__title fr-mb-8v">
            {modalTitle}
          </h1>
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
        </div>

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
