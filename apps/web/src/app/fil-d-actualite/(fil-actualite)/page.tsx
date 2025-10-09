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
  await updateLastOpenedAt(user.id)

  return (
    <>
      <NewsFeedOnboardingDone fromOnboarding={!!onboarding} />
      <div className={styles.sideNavContainer}>
        <nav
          className="fr-sidemenu fr-sidemenu--sticky-full-height fr-pr-0"
          style={{ width: '314px' }}
        >
          <NewsFeedSearchFilters
            searchParams={awaitedSearchParams}
            newsFeedPageContext={newsFeedPageContext}
          />
        </nav>
      </div>
      <div className={styles.pageContainer}>
        <NewsFeedPage
          searchParams={{ onboarding, secteur, thematique, base, profil }}
          newsFeedPageContext={newsFeedPageContext}
          paginationParams={paginationParams}
        />
      </div>
    </>
  )
}
