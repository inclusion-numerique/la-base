'use client'

import CheckboxGroupFormField from '@app/ui/components/Form/CheckboxGroupFormField'
import IconInSquare from '@app/web/components/IconInSquare'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import NewsFeedOnboardingSkipButton from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingSkipButton'
import {
  UpdateNewsFeedSectorsProfessionnalsCommand,
  UpdateNewsFeedSectorsProfessionnalsValidation,
} from '@app/web/features/fil-d-actualite/onboarding/professionals-sectors/newsFeedProfessionnalsSectors'
import { professionalSectorsOptions } from '@app/web/themes/professionalSectors'
import { trpc } from '@app/web/trpc'
import { RiIconClassName } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProfessionalSector } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import styles from './NewsFeedProfessionnalsSectors.module.css'

const NewsFeedProfessionnalsSectors = ({
  professionalSectors,
}: {
  professionalSectors?: ProfessionalSector[]
}) => {
  const mutate = trpc.newsFeed.updateProfessionalSectors.useMutation()
  const router = useRouter()

  const form = useForm<UpdateNewsFeedSectorsProfessionnalsCommand>({
    resolver: zodResolver(UpdateNewsFeedSectorsProfessionnalsValidation),
    defaultValues: {
      professionalSectors,
    },
  })

  const professionalSectorsIcon: Record<ProfessionalSector, RiIconClassName> = {
    ActeursPublics: 'ri-government-line',
    ActeursPrivesEtAssociatifs: 'ri-building-line',
    AidantsEtMediateursNumeriques: 'ri-user-heart-line',
    AutresProfessionnels: 'ri-group-line',
  }

  const onSubmit = async (data: UpdateNewsFeedSectorsProfessionnalsCommand) => {
    try {
      await mutate.mutateAsync(data)
      router.push('/fil-d-actualite/onboarding/themes')
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CheckboxGroupFormField
          control={form.control}
          path="professionalSectors"
          options={professionalSectorsOptions}
          classes={{
            checkboxGroup: 'fr-p-6v fr-border fr-border-radius--8',
          }}
          components={{
            label: ({ option, htmlFor }) => (
              <label htmlFor={htmlFor} className={styles.labelContainer}>
                <div className="fr-ml-2w">
                  <span className="fr-text--lg fr-text--bold fr-mb-0">
                    {option.label}
                  </span>
                  <span className="fr-hint-text">{option.hint}</span>
                </div>
                <IconInSquare
                  iconId={
                    professionalSectorsIcon[option.value as ProfessionalSector]
                  }
                />
              </label>
            ),
          }}
        />
        <div className="fr-width-full fr-mt-12v">
          <Button
            className="fr-width-full fr-flex fr-justify-content-center"
            type="submit"
            disabled={mutate.isPending}
          >
            Suivant
          </Button>
        </div>
      </form>
      <div className="fr-flex fr-justify-content-center fr-mt-6v">
        <NewsFeedOnboardingSkipButton />
      </div>
    </>
  )
}

export default withTrpc(NewsFeedProfessionnalsSectors)
