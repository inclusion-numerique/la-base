import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import NewsFeedPage from '@app/web/features/fil-d-actualite/NewsFeedPage'
import { NewsFeedOnboardingDone } from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingDoneModal'
import { UrlPaginationParams } from '@app/web/server/search/searchQueryParams'
import { redirect } from 'next/navigation'

export default async function NewsFeed({
  searchParams,
}: {
  searchParams: Promise<
    UrlPaginationParams & { onboarding: string | undefined }
  >
}) {
  const { onboarding, ...paginationParams } = await searchParams
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/fil-d-actualite`)
  }
  return (
    <>
      <NewsFeedOnboardingDone fromOnboarding={!!onboarding} />
      <div className="fr-container">
        <Breadcrumbs
          currentPage="Mon fil d'actualité"
          className="fr-m-0 fr-py-4v"
        />
        <NewsFeedPage searchParams={paginationParams} />
      </div>
    </>
  )
}
