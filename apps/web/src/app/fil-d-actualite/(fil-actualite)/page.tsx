import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  getNewsFeedPageContext,
  updateLastOpenedAt,
} from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import NewsFeedPage from '@app/web/features/fil-d-actualite/NewsFeedPage'
import { NewsFeedSearchFilters } from '@app/web/features/fil-d-actualite/NewsFeedSearchFilters'
import { NewsFeedOnboardingDone } from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingDoneModal'
import {
  sanitizeUrlPaginationParams,
  UrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'
import { ProfessionalSector, Theme } from '@prisma/client'
import classNames from 'classnames'
import { redirect } from 'next/navigation'
import styles from './NewsFeedLayout.module.css'

export type NewsFeedSearchParams = {
  onboarding: string | undefined
  secteur: string | undefined
  thematique: string | undefined
  base: string | undefined
  profil: string | undefined
}

export default async function NewsFeed({
  searchParams,
}: {
  searchParams: Promise<UrlPaginationParams & NewsFeedSearchParams>
}) {
  const awaitedSearchParams = await searchParams
  const {
    onboarding,
    secteur,
    thematique,
    base,
    profil,
    ...searchPaginationParams
  } = await awaitedSearchParams

  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/fil-d-actualite`)
  }
  const paginationParams = {
    ...sanitizeUrlPaginationParams(searchPaginationParams),
    perPage: 20,
  }

  const newsFeedPageContext = await getNewsFeedPageContext(
    {
      professionalSectors: secteur ? [secteur as ProfessionalSector] : [],
      themes: thematique ? [thematique as Theme] : [],
      profileSlug: profil,
      baseSlug: base,
    },
    paginationParams,
  )
  // no await - we don't want to block the thread
  updateLastOpenedAt(user.id)

  return (
    <>
      <NewsFeedOnboardingDone fromOnboarding={!!onboarding} />
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
            searchParams={awaitedSearchParams}
            newsFeedPageContext={newsFeedPageContext}
          />
        </div>
      </nav>
      <div className={styles.pageContainer}>
        <NewsFeedPage
          searchParams={{ onboarding, secteur, thematique, base, profil }}
          newsFeedPageContext={newsFeedPageContext}
        />
      </div>
    </>
  )
}
