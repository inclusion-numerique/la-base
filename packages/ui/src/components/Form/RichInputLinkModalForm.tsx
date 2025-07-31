'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormEventHandler, ReactNode, ReactPortal, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import z from 'zod'

// React-dom types are broken at the moment !
const { createPortal } = ReactDOM as {
  createPortal: (
    children: ReactNode,
    container: Element | DocumentFragment,
    key?: null | string,
  ) => ReactPortal
}

export const RichInputLinkModal = createModal({
  id: 'rich-input-form-link-config',
  isOpenedByDefault: false,
})

const RichInputLinkValidation = z.object({
  url: z
    .string({ required_error: 'Veuillez renseigner le lien' })
    .url({ message: 'Veuillez renseigner un lien valide' }),
})
export type RichInputLink = z.infer<typeof RichInputLinkValidation>

const RichInputLinkModalForm = ({
  onSubmit: onSubmitProperty,
  onCancel: onCancelProperty,
  url,
}: {
  onSubmit: (data: RichInputLink) => void
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
  } = useForm<RichInputLink>({
    resolver: zodResolver(RichInputLinkValidation),
    defaultValues: {
      url,
    },
  })

  useModalVisibility(RichInputLinkModal.id, {
    onClosed: () => {
      reset({ url: undefined })
    },
  })

  const onSubmitHandler: FormEventHandler = (event) => {
    event.stopPropagation()
    handleSubmit((data: RichInputLink) => {
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
      <RichInputLinkModal.Component
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
      </RichInputLinkModal.Component>
    </form>,
    document.body,
  )
}

export default RichInputLinkModalForm
