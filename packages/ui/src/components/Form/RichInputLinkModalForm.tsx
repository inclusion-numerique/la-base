'use client'

import React, {
  FormEventHandler,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
} from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModalVisibility } from '@app/web/hooks/useModalVisibility'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import z from 'zod'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactDOM from 'react-dom'
import InputFormField from '@app/ui/components/Form/InputFormField'

// React-dom types are broken at the moment !
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
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
  onSubmit: onSubmitProp,
  onCancel: onCancelProp,
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
      url,
    },
  })

  useModalVisibility(modalRef.current, {
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
      onSubmitProp(data)
    })(event)
  }

  useEffect(() => {
    reset({ url })
  }, [reset, url])

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
