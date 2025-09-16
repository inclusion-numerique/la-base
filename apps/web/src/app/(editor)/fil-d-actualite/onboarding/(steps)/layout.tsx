import { getSessionUser } from '@app/web/auth/getSessionUser'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import NewsFeedOnboardingBreadcrumb from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingBreadcrumb'
import { contentId } from '@app/web/utils/skipLinks'
import { redirect } from 'next/navigation'

export default async function NewsFeedOnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSessionUser()
  const userNewsFeed = await getNewsFeed(user)

  if (userNewsFeed?.hasCompleteOnboarding) {
    return redirect('/fil-d-actualite')
  }

  return (
    <>
      <SkipLinksPortal />
      <main id={contentId} className="fr-height-full">
        <div className="fr-height-full">
          <div className="fr-container">
            <NewsFeedOnboardingBreadcrumb />
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
