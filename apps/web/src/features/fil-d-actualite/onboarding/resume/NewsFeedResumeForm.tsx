'use client'

import ToggleFormField from '@app/ui/components/Form/ToggleFormField'
import { createToast } from '@app/ui/toast/createToast'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { UserNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import NewsFeedOnboardingSkipButton from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingSkipButton'
import {
  UpdateNewsFeedResumeCommand,
  UpdateNewsFeedResumeValidation,
} from '@app/web/features/fil-d-actualite/onboarding/resume/newsFeedResume'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Sentry from '@sentry/nextjs'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const NewsFeedResumeForm = ({
  user,
  userNewsFeed,
  context,
}: {
  user: SessionUser | null
  userNewsFeed: UserNewsFeed | null
  context: 'preferences' | 'onboarding'
}) => {
  const mutate = trpc.newsFeed.updateMonthlyNewsletter.useMutation()
  const router = useRouter()

  const form = useForm<UpdateNewsFeedResumeCommand>({
    resolver: zodResolver(UpdateNewsFeedResumeValidation),
    defaultValues: {
      monthlyResume: !!userNewsFeed?.monthlyNewsletter,
    },
  })

  const onSubmit = async (data: UpdateNewsFeedResumeCommand) => {
    try {
      await mutate.mutateAsync(data, {
        onSuccess: () => {
          if (context === 'onboarding') {
            router.push('/fil-d-actualite/tout?onboarding=true')
          }
          if (context === 'preferences') {
            router.refresh()
            createToast({
              priority: 'success',
              message: 'Vos préférences ont été mises à jour.',
            })
          }
        },
      })
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  const monthlyResumeValue = form.watch('monthlyResume')

  // biome-ignore lint/correctness/useExhaustiveDependencies: dont need the onsubmit in the deps array
  useEffect(() => {
    if (
      context === 'preferences' &&
      monthlyResumeValue !== !!userNewsFeed?.monthlyNewsletter
    ) {
      form.handleSubmit(onSubmit)()
    }
  }, [monthlyResumeValue, context, form, userNewsFeed?.monthlyNewsletter])

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="fr-p-4w fr-border fr-border-radius--8">
          {context === 'preferences' && (
            <div className="fr-flex fr-align-items-center fr-flex-gap-2v fr-text--xs">
              <span className="ri-mail-line fr-mr-1w" />
              <span className="fr-text--uppercase">
                Résumé mensuel des dernières publications
              </span>
            </div>
          )}
          <ToggleFormField
            control={form.control}
            className={classNames(context === 'preferences' && 'fr-mb-0')}
            path="monthlyResume"
            disabled={mutate.isPending}
            label={
              'Je souhaite recevoir par mail un résumé mensuel des dernières publications liés à mes préférences.'
            }
            hint={`Cet email sera envoyé à l’adresse : ${user?.email}`}
            labelPosition="left"
          />
          {context === 'onboarding' && (
            <Notice
              title={
                <span>
                  Vous pourrez modifier votre sélection à tout moment via la
                  page
                  <span className="fr-text--bold">
                    &nbsp;Gérer mes préférences&nbsp;
                  </span>
                  disponible depuis votre fil d’actualité
                </span>
              }
            />
          )}
        </div>
        {context === 'onboarding' && (
          <div className="fr-width-full fr-mt-12v">
            <Button
              className="fr-width-full fr-flex fr-justify-content-center"
              type="submit"
              disabled={mutate.isPending}
            >
              Valider mes préférences
            </Button>
          </div>
        )}
      </form>
      {context === 'onboarding' && (
        <div className="fr-flex fr-justify-content-center fr-mt-6v">
          <NewsFeedOnboardingSkipButton userNewsFeed={userNewsFeed} />
        </div>
      )}
    </>
  )
}

export default withTrpc(NewsFeedResumeForm)
