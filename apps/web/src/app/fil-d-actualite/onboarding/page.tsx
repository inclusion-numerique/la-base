import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import NewsFeedOnboardingPage from '@app/web/features/fil-d-actualite/onboarding/NewsFeedOnboardingPage'
import { contentId } from '@app/web/utils/skipLinks'
import { redirect } from 'next/navigation'
import styles from './NewsFeedOnboardingPage.module.css'

export default async function NewsFeedParametragePage() {
  const user = await getSessionUser()
  const userNewsFeed = await getNewsFeed(user)

  if (userNewsFeed?.hasCompleteOnboarding) {
    return redirect('/fil-d-actualite')
  }
  return (
    <>
      <SkipLinksPortal />
      <main id={contentId} className="fr-height-full">
        <div className={styles.container}>
          <div className="fr-container">
            <Breadcrumbs
              currentPage="Paramétrer mon fil d'actualité"
              className="fr-m-0 fr-pt-4v"
            />
            <NewsFeedOnboardingPage />
          </div>
        </div>
      </main>
    </>
  )
}
