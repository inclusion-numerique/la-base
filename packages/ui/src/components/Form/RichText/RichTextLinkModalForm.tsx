'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormEventHandler, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import z from 'zod'

export const RichTextLinkModal = createModal({
  id: 'rich-input-form-link-config',
  isOpenedByDefault: false,
})

const RichTextLinkValidation = z.object({
  url: z
    .string({ required_error: 'Veuillez renseigner le lien' })
    .url({ message: 'Veuillez renseigner un lien valide' }),
})
export type RichTextLink = z.infer<typeof RichTextLinkValidation>

const RichTextLinkModalForm = ({
  onSubmit: onSubmitProperty,
  onCancel: onCancelProperty,
  url,
}: {
  onSubmit: (data: RichTextLink) => void
  onCancel?: () => void
  url?: string
}) => {
  const { title, cancelLabel, confirmLabel } = url
    ? {
        title: 'Modifier le lien',
        cancelLabel: 'Supprimer le lien',
        confirmLabel: 'Modifier',
      }
    : {
        title: 'Ajouter un lien',
        cancelLabel: 'Annuler',
        confirmLabel: 'Ajouter',
      }

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RichTextLink>({
    resolver: zodResolver(RichTextLinkValidation),
    defaultValues: {
      url,
    },
  })

  useModalVisibility(RichTextLinkModal.id, {
    onClosed: () => {
      reset({ url: undefined })
    },
  })

  const onSubmitHandler: FormEventHandler = (event) => {
    event.stopPropagation()
    handleSubmit((data: RichTextLink) => {
      if (isSubmitting) {
        return
      }
      onSubmitProperty(data)
    })(event)
  }

  useEffect(() => {
    reset({ url })
  }, [reset, url])

  const disabled = isSubmitting

  return createPortal(
    <form onSubmit={onSubmitHandler}>
      <RichTextLinkModal.Component
        title={title}
        buttons={[
          {
            title: cancelLabel,
            priority: 'secondary',
            doClosesModal: true,
            children: cancelLabel,
            type: 'button',
            onClick: onCancelProperty,
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
        <InputFormField
          control={control}
          path="url"
          label="Copier le lien ici"
          placeholder="https://"
          disabled={disabled}
        />
      </RichTextLinkModal.Component>
    </form>,
    document.body,
  )
}

export default RichTextLinkModalForm
