'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import InputFormField from '@app/ui/components/Form/InputFormField'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import React from 'react'
import {
  AssistantData,
  AssistantValidation,
} from '@app/web/assistant/Assistant'

export const AssistantForm = () => {
  const { control, formState, handleSubmit } = useForm<AssistantData>({
    resolver: zodResolver(AssistantValidation),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit = () => console.log('submit')
  const disabled = formState.isSubmitting || formState.isSubmitSuccessful
  return (
    <form onSubmit={handleSubmit(() => console.log('submit'))}>
      <InputFormField
        control={control}
        path="prompt"
        label="Une question ?"
        hint="Exemple : Je veux organiser un atelier sur les fakenews pour les adolescents..."
        type="textarea"
        rows={4}
        className="fr-mb-4v"
      />
      <ButtonsGroup
        buttons={[
          {
            disabled,
            iconId: 'fr-icon-chat-2-line',
            children: '',
            type: 'submit',
            className: disabled ? 'fr-btn--loading' : undefined,
          },
        ]}
      />
    </form>
  )
}
