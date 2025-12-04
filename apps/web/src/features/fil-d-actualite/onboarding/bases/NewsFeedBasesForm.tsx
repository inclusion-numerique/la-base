import { SessionUser } from '@app/web/auth/sessionUser'
import BaseCard from '@app/web/components/Base/Card/BaseCard'
import { UserNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import { NewsFeedRecommendedBases } from '@app/web/features/fil-d-actualite/db/getRecommendedBasesToFollow'
import { NewsFeedBasesNextStep } from '@app/web/features/fil-d-actualite/onboarding/bases/NewsFeedBasesNextStep'
import NewsFeedOnboardingSkipButton from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingSkipButton'

export default function NewsFeedBasesForm({
  bases,
  user,
  userNewsFeed,
}: {
  bases: NewsFeedRecommendedBases
  user: SessionUser | null
  userNewsFeed: UserNewsFeed | null
}) {
  return (
    <>
      <div className="fr-flex fr-direction-column">
        {bases.map((base) => (
          <BaseCard key={base.id} base={base} user={user} compact={false} />
        ))}
      </div>
      <div className="fr-width-full fr-mt-12v">
        <NewsFeedBasesNextStep />
        <div className="fr-flex fr-justify-content-center fr-mt-6v">
          <NewsFeedOnboardingSkipButton userNewsFeed={userNewsFeed} />
        </div>
      </div>
    </>
  )
}
