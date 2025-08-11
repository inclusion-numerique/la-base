'use client'

import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import CaptchaWidget, {
  type CaptchaWidgetHandle,
} from '@app/web/features/captcha/components/CaptchaWidget'
import {
  type UserSignup,
  UserSignupValidation,
} from '@app/web/server/rpc/user/userSignup'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import type { WidgetErrorData } from '@friendlycaptcha/sdk'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import Cookies from 'js-cookie'
import type { Route } from 'next'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

const EmailSignupForm = ({
  error,
  callbackUrl,
  email,
}: {
  error?: string
  email?: string
  callbackUrl: Route
}) => {
  const form = useForm<UserSignup>({
    resolver: zodResolver(UserSignupValidation),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { email },
  })

  const signup = trpc.user.signup.useMutation()

  const captchaRef = useRef<CaptchaWidgetHandle>(null)

  const onCaptchaComplete = (response: string) => {
    form.setValue('captcha', response)
  }
  const onCaptchaError = (_error: WidgetErrorData) => {
    form.setValue('captcha', '')
  }
  const onCaptchaExpire = () => {
    form.setValue('captcha', '')
  }

  const onSubmit = async (data: UserSignup) => {
    try {
      await signup.mutateAsync(data)
    } catch (mutationError) {
      // TODO Reset the captcha component
      captchaRef.current?.reset()
      if (
        applyZodValidationMutationErrorsToForm(mutationError, form.setError)
      ) {
        return
      }
      createToast({
        priority: 'error',
        message: 'Erreur lors de la création du compte',
      })
      throw mutationError
    }

    // Set the email in a cookie for usage in Verify page as redirections resets state
    Cookies.set('email-signin', data.email, { sameSite: 'strict' })
    await signIn('email', { callbackUrl, ...data })
  }
  const isLoading =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful

  return (
    <>
      <script
        type="module"
        src="/lib/@friendlycaptcha/sdk@0.1.30/site.min.js"
        async
        defer
      ></script>
      <script
        noModule
        src="/lib/@friendlycaptcha/sdk@0.1.30/site.compat.min.js"
        async
        defer
      ></script>
      <form id="signup-with-email" onSubmit={form.handleSubmit(onSubmit)}>
        {error ? (
          <div className="fr-fieldset__element">
            <div className="fr-alert fr-alert--error fr-alert--sm">
              <p>{error}</p>
            </div>
          </div>
        ) : null}
        <InputFormField
          control={form.control}
          path="email"
          label="Email"
          disabled={isLoading}
        />
        <InputFormField
          control={form.control}
          path="firstName"
          label="Prénom"
          disabled={isLoading}
        />
        <InputFormField
          control={form.control}
          path="lastName"
          label="Nom"
          disabled={isLoading}
        />
        <div className="fr-my-6v">
          <CaptchaWidget
            ref={captchaRef}
            onComplete={onCaptchaComplete}
            onError={onCaptchaError}
            onExpire={onCaptchaExpire}
          />
          {form.formState.errors.captcha && (
            <p
              id={`captcha__error`}
              className={classNames('fr-error-text fr-width-full', {
                'fr-mt-1v': !!form.formState.errors.captcha,
              })}
            >
              {form.formState.errors.captcha.message}
            </p>
          )}
        </div>
        <CheckboxFormField
          control={form.control}
          path="policyAccepted"
          data-testid="cgu"
          label={
            <span>
              J&lsquo;ai lu et j&lsquo;accepte les 
              <Link
                href="/cgu"
                target="_blank"
                className="fr-btn--no-after fr-link"
              >
                conditions générales d’utilisation du service
              </Link>
               ainsi que la{' '}
              <Link
                href="/confidentialite"
                target="_blank"
                className="fr-btn--no-after fr-link"
              >
                politique de confidentialité.
              </Link>
            </span>
          }
          disabled={isLoading}
        />

        <div className="fr-width-full">
          <Button
            iconId="fr-icon-account-circle-line"
            type="submit"
            size="large"
            {...buttonLoadingClassname(
              isLoading,
              'fr-width-full fr-flex fr-justify-content-center fr-mt-10v',
            )}
          >
            Créer mon compte
          </Button>
        </div>
      </form>
    </>
  )
}

export default withTrpc(EmailSignupForm)
