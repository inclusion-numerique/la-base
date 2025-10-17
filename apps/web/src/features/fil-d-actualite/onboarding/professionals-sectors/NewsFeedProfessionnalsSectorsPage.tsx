import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import NewsFeedOnboardingHeader from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingHeader'
import NewsFeedProfessionnalsSectorsForm from '@app/web/features/fil-d-actualite/onboarding/professionals-sectors/NewsFeedProfessionnalsSectorsForm'

export default async function NewsFeedProfessionnalsSectors() {
  const user = await getSessionUser()
  const userNewsFeed = await getNewsFeed(user)

  return (
    <div className="fr-flex fr-direction-column">
      <NewsFeedOnboardingHeader
        step={1}
        title="Quel secteur professionnel vous intéresse ?"
        nextStepTitle="Quelles thématiques vous intéressent ?"
        description="Découvrez et restez informé des ressources liées à votre secteur professionnel"
        noticeTitle="Sélectionnez un ou plusieurs secteurs professionnels"
      />
      <NewsFeedProfessionnalsSectorsForm
        userNewsFeed={userNewsFeed}
        context="onboarding"
      />
    </div>
  )
}
