'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import type { Route } from 'next'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'

const SigninFormValidation = z.object({
  email: z
    .string({ required_error: 'Veuillez renseigner votre email' })
    .nonempty('Veuillez renseigner votre email')
    .email('Merci de renseigner un email valide'),
})
type SigninFormData = z.infer<typeof SigninFormValidation>

export const EmailSigninForm = ({ callbackUrl }: { callbackUrl: Route }) => {
  const searchParams = useSearchParams()
  const form = useForm<SigninFormData>({
    defaultValues: {
      email: searchParams?.get('email') ?? undefined,
    },
    resolver: zodResolver(SigninFormValidation),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit = ({ email }: SigninFormData) => {
    // Set the email in a cookie for usage in Verify page as redirections resets memory
    Cookies.set('email-signin', email, { sameSite: 'strict' })
    return signIn('email', { email, callbackUrl })
  }
  const disabled =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful
  return (
    <form id="signin-with-email" onSubmit={form.handleSubmit(onSubmit)}>
      <InputFormField
        control={form.control}
        path="email"
        label="Email"
        classes={{
          input: 'fr-input--white',
        }}
        disabled={disabled}
      />
      <ButtonsGroup
        buttons={[
          {
            iconId: 'fr-icon-account-circle-line',
            children: 'Se connecter',
            type: 'submit',
            className: disabled ? 'fr-btn--loading' : undefined,
          },
        ]}
      />
    </form>
  )
}
