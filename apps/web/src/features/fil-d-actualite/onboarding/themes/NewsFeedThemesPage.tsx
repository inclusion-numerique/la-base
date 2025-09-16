import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import NewsFeedOnboardingHeader from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingHeader'
import NewsFeedThemesForm from '@app/web/features/fil-d-actualite/onboarding/themes/NewsFeedThemesForm'

export default async function NewsFeedThemes() {
  const user = await getSessionUser()
  const userNewsFeed = await getNewsFeed(user)

  return (
    <div className="fr-flex fr-direction-column">
      <NewsFeedOnboardingHeader
        step={2}
        title="Quelles thématiques vous intéressent ?"
        nextStepTitle="Suivez des bases"
        description="Découvrez et restez informé des ressources liées à vos centres d’intérêts."
        noticeTitle="Nous vous conseillons de sélectionner au minimum 3 thématiques."
        previousHref="/fil-d-actualite/onboarding/secteurs-professionnels"
      />
      <NewsFeedThemesForm themes={userNewsFeed?.themes} />
    </div>
  )
}
