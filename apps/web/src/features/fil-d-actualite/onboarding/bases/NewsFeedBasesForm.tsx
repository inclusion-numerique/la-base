import { SessionUser } from '@app/web/auth/sessionUser'
import BaseCard from '@app/web/components/Base/Card/BaseCard'
import { NewsFeedRecommendedBases } from '@app/web/features/fil-d-actualite/db/getRecommendedBasesToFollow'
import NewsFeedOnboardingSkipButton from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingSkipButton'
import Button from '@codegouvfr/react-dsfr/Button'

export default function NewsFeedBasesForm({
  bases,
  user,
}: {
  bases: NewsFeedRecommendedBases
  user: SessionUser | null
}) {
  return (
    <>
      <div className="fr-flex fr-direction-column fr-flex-gap-12v">
        {bases.map((base) => (
          <BaseCard key={base.id} base={base} user={user} compact={false} />
        ))}
      </div>
      <div className="fr-width-full fr-mt-12v">
        <Button
          className="fr-width-full fr-flex fr-justify-content-center"
          linkProps={{
            href: '/fil-d-actualite/onboarding/resume-mensuel',
          }}
        >
          Suivant
        </Button>
        <div className="fr-flex fr-justify-content-center fr-mt-6v">
          <NewsFeedOnboardingSkipButton />
        </div>
      </div>
    </>
  )
}
