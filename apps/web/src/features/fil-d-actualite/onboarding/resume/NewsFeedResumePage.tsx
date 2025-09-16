import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import NewsFeedOnboardingHeader from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingHeader'
import NewsFeedResumeForm from '@app/web/features/fil-d-actualite/onboarding/resume/NewsFeedResumeForm'

export default async function NewsFeedResumePage() {
  const user = await getSessionUser()
  const userNewsFeed = await getNewsFeed(user)

  return (
    <div className="fr-flex fr-direction-column">
      <NewsFeedOnboardingHeader
        step={4}
        title="Résumé mensuel des dernières publications"
        description="Soyez informé par mail en complément de votre fil d’actualité."
        previousHref="/fil-d-actualite/onboarding/bases"
      />
      <NewsFeedResumeForm
        user={user}
        newsletter={userNewsFeed?.monthlyNewsletter}
      />
    </div>
  )
}
