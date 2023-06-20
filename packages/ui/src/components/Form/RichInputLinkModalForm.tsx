'use client'

import React, { FormEventHandler, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModalVisibility } from '@app/web/hooks/useModalVisibility'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import z from 'zod'
import { createPortal } from 'react-dom'
import InputFormField from '@app/ui/components/Form/InputFormField'

export const RichInputLinkModal = createModal({
  id: 'rich-input-form-link-config',
  isOpenedByDefault: false,
})

const RichInputLinkValidation = z.object({
  text: z.string(),
  url: z.string().url().nullish(),
})
export type RichInputLink = z.infer<typeof RichInputLinkValidation>

const RichInputLinkModalForm = ({
  onSubmit: onSubmitProp,
  onCancel: onCancelProp,
  url,
  text,
}: {
  onSubmit: (data: RichInputLink) => void
  onCancel?: () => void
  text?: string
  url?: string
}) => {
  console.log('MODAL FORM', url)
  const { title, cancelLabel, confirmLabel } = url
    ? {
        title: 'Modifier le lien',
        cancelLabel: 'Supprimer',
        confirmLabel: 'Modifier',
      }
    : {
        title: 'Ajouter un lien',
        cancelLabel: 'Annuler',
        confirmLabel: 'Ajouter',
      }

  // Forward ref do not work with modal, we have to make a workaround with form ref
  const formRef = useRef<HTMLFormElement>(null)
  const modalRef = useRef<HTMLDialogElement>()
  if (!modalRef.current) {
    // Will only execute while first form element render is done
    modalRef.current = formRef.current?.querySelector('dialog') ?? undefined
  }
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RichInputLink>({
    resolver: zodResolver(RichInputLinkValidation),
    defaultValues: {
      text,
      url,
    },
  })

  useModalVisibility(modalRef.current, {
    onClosed: () => {
      reset({ text: undefined, url: undefined })
    },
  })

  const onSubmitHandler: FormEventHandler = (event) => {
    event.stopPropagation()
    handleSubmit((data: RichInputLink) => {
      console.log('SUBMITED', data)
      if (isSubmitting) {
        return
      }
      onSubmitProp(data)
    })(event)
  }

  useEffect(() => {
    console.log('RESETTING FORM', { url, text })
    reset({ url, text })
  }, [reset, url, text])

  const disabled = isSubmitting

  return createPortal(
    <form ref={formRef} onSubmit={onSubmitHandler}>
      <RichInputLinkModal.Component
        title={title}
        buttons={[
          {
            title: cancelLabel,
            priority: 'secondary',
            doClosesModal: true,
            children: cancelLabel,
            type: 'button',
            onClick: onCancelProp,
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
        <>
          <InputFormField
            control={control}
            path="text"
            label="Texte du lien"
            disabled={disabled}
          />
          <InputFormField
            control={control}
            path="url"
            label="Copier le lien ici"
            disabled={disabled}
          />
        </>
      </RichInputLinkModal.Component>
    </form>,
    document.body,
  )
}

export default RichInputLinkModalForm
