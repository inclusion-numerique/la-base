import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import type { CreateBaseCommand } from '@app/web/server/bases/createBase'
import type { UpdateBaseContactsCommand } from '@app/web/server/bases/updateBase'
import React from 'react'
import type { UseFormReturn } from 'react-hook-form'

const BaseContactsEdition = ({
  form,
}: {
  form: UseFormReturn<CreateBaseCommand | UpdateBaseContactsCommand>
}) => (
  <>
    <InputFormField
      className="fr-mb-3v"
      data-testid="base-email-input"
      control={form.control}
      path="email"
      label="Adresse e-mail"
      disabled={form.formState.isSubmitting}
      asterisk
    />
    <div className="fr-input-group">
      <CheckboxFormField
        control={form.control}
        path="emailIsPublic"
        label="Je veux pouvoir être contacté par les visiteurs de la plateforme"
        disabled={form.formState.isSubmitting}
      />
    </div>
    <InputFormField
      control={form.control}
      data-testid="base-website-input"
      path="website"
      label="Site internet"
      disabled={form.formState.isSubmitting}
    />
    <InputFormField
      control={form.control}
      data-testid="base-facebook-input"
      path="facebook"
      label="Facebook"
      disabled={form.formState.isSubmitting}
    />
    <InputFormField
      control={form.control}
      data-testid="base-twitter-input"
      path="twitter"
      label="Twitter"
      disabled={form.formState.isSubmitting}
    />
    <InputFormField
      control={form.control}
      data-testid="base-linkedin-input"
      path="linkedin"
      label="LinkedIn"
      disabled={form.formState.isSubmitting}
    />
  </>
)

export default BaseContactsEdition
