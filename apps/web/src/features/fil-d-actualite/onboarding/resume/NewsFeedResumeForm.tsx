'use client'

import ToggleFormField from '@app/ui/components/Form/ToggleFormField'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
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
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const NewsFeedResumeForm = ({
  user,
  newsletter,
}: {
  user: SessionUser | null
  newsletter?: boolean
}) => {
  const mutate = trpc.newsFeed.updateMonthlyNewsletter.useMutation()
  const router = useRouter()

  const form = useForm<UpdateNewsFeedResumeCommand>({
    resolver: zodResolver(UpdateNewsFeedResumeValidation),
    defaultValues: {
      monthlyResume: !!newsletter,
    },
  })

  const onSubmit = async (data: UpdateNewsFeedResumeCommand) => {
    try {
      await mutate.mutateAsync(data)
      router.push('/fil-d-actualite?onboarding=true')
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="fr-p-4w fr-border fr-border-radius--8 fr-mt-12v">
          <ToggleFormField
            control={form.control}
            path="monthlyResume"
            disabled={mutate.isPending}
            label={
              'Je souhaite recevoir par mail un résumé mensuel des dernières publications liés à mes préférences.'
            }
            hint={`Cet email sera envoyé à l’adresse : ${user?.email}`}
            labelPosition="left"
          />
          <Notice
            title={
              <span>
                Vous pourrez modifier votre sélection à tout moment via la page
                <span className="fr-text--bold">
                  &nbsp;Gérer mes préférences&nbsp;
                </span>
                disponible depuis votre fil d’actualité
              </span>
            }
          />
        </div>
        <div className="fr-width-full fr-mt-12v">
          <Button
            className="fr-width-full fr-flex fr-justify-content-center"
            type="submit"
            disabled={mutate.isPending}
          >
            Valider mes préférences
          </Button>
        </div>
      </form>
      <div className="fr-flex fr-justify-content-center fr-mt-6v">
        <NewsFeedOnboardingSkipButton />
      </div>
    </>
  )
}

export default withTrpc(NewsFeedResumeForm)
