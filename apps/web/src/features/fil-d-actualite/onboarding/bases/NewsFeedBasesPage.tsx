import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import { getRecommendedBasesToFollow } from '@app/web/features/fil-d-actualite/db/getRecommendedBasesToFollow'
import NewsFeedBasesForm from '@app/web/features/fil-d-actualite/onboarding/bases/NewsFeedBasesForm'
import NewsFeedOnboardingHeader from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingHeader'

export default async function NewsFeedBasesPage() {
  const user = await getSessionUser()
  const userNewsFeed = await getNewsFeed(user)
  const bases = await getRecommendedBasesToFollow(user)
  return (
    <div className="fr-flex fr-direction-column">
      <NewsFeedOnboardingHeader
        step={3}
        title="Suivez des bases"
        nextStepTitle="Résumé mensuel des dernières publications"
        description="Découvrez et restez informé des ressources publiées par vos créateurs favoris."
        noticeTitle="Nous vous recommandons ici des bases qui publient des ressources liés à votre secteur professionnel et/ou les thématiques sélectionnées aux étapes précédentes."
        previousHref="/fil-d-actualite/onboarding/themes"
      />
      <NewsFeedBasesForm
        bases={bases}
        userNewsFeed={userNewsFeed}
        user={user}
      />
    </div>
  )
}
