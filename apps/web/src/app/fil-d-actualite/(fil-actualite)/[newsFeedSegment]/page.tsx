import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import NewsFeedBadgeInvalidation from '@app/web/features/fil-d-actualite/components/NewsFeedBadgeInvalidation'
import NewsFeedPage from '@app/web/features/fil-d-actualite/NewsFeedPage'
import { NewsFeedSearchFilters } from '@app/web/features/fil-d-actualite/NewsFeedSearchFilters'
import { NewsFeedOnboardingDone } from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingDoneModal'
import {
  NewsFeedSearchParams,
  parseNewsFeedSegment,
} from '@app/web/server/newsFeed/newsFeedUrls'
import {
  sanitizeUrlPaginationParams,
  UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'
import { ProfessionalSector, Theme } from '@prisma/client'
import classNames from 'classnames'
import { redirect } from 'next/navigation'
import styles from '../NewsFeedLayout.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function NewsFeedSegmentPage({
  params,
  searchParams,
}: {
  params: Promise<{
    newsFeedSegment: string
  }>
  searchParams: Promise<UrlPaginationParams & NewsFeedSearchParams>
}) {
  const { newsFeedSegment } = await params
  const awaitedSearchParams = await searchParams
  const { onboarding, ...searchPaginationParams } = awaitedSearchParams

  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/fil-d-actualite/${newsFeedSegment}`)
  }

  const paginationParams = {
    ...sanitizeUrlPaginationParams(searchPaginationParams),
    perPage: 20,
  }

  const newsFeedParams = parseNewsFeedSegment(newsFeedSegment)
  const { secteur, thematique, base, profil } = newsFeedParams

  const filters = {
    professionalSectors: secteur ? [secteur as ProfessionalSector] : [],
    themes: thematique ? [thematique as Theme] : [],
    profileSlug: profil,
    baseSlug: base,
  }

  return (
    <>
      <NewsFeedOnboardingDone fromOnboarding={!!onboarding} />
      <NewsFeedBadgeInvalidation />
      <nav
        className="fr-sidemenu fr-sidemenu--sticky-full-height fr-pr-0"
        style={{ width: '314px' }}
      >
        <div
          className={classNames(
            styles.sideNavContainer,
            'fr-hidden fr-unhidden-md fr-sidemenu__inner',
          )}
        >
          <NewsFeedSearchFilters
            params={newsFeedParams}
            filters={filters}
            pagination={paginationParams}
          />
        </div>
      </nav>
      <div className={classNames('fr-container', styles.pageContainer)}>
        <Breadcrumbs
          currentPage="Mon fil d'actualité"
          className="fr-m-0 fr-py-4v"
        />
        <NewsFeedPage
          params={newsFeedParams}
          filters={filters}
          pagination={paginationParams}
        />
      </div>
    </>
  )
}
