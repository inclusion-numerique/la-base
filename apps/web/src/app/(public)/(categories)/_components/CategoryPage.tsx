import { ThematicHeader } from '@app/web/app/(public)/(categories)/_components/ThematicHeader'
import { ThematicTags } from '@app/web/app/(public)/(categories)/_components/ThematicTags'
import { categoryStyles } from '@app/web/app/(public)/(categories)/_helpers/categoryStyles'
import { createThematicLink } from '@app/web/app/(public)/(categories)/_helpers/createThematicLink'
import Newsletter from '@app/web/app/(public)/Newsletter'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ResourcesSearchResults from '@app/web/components/Search/ResourcesSearchResults'
import SearchResults from '@app/web/components/Search/SearchResults'
import { ThematicLinkSortingSelect } from '@app/web/components/Search/ThematicLinkResultSortingSelect'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getHomeCategoriesCount } from '@app/web/features/home/components/getHomeCategoriesCount'
import { executeResourcesSearch } from '@app/web/server/search/executeSearch'
import {
  type Sorting,
  sanitizeUrlPaginationParams,
  searchParamsFromSegment,
} from '@app/web/server/search/searchQueryParams'
import { type Category, categoryThemesOptions } from '@app/web/themes/themes'
import { contentId } from '@app/web/utils/skipLinks'
import type { Theme } from '@prisma/client'
import React from 'react'

export type CategoryPageUrlParams = {
  page?: string | string[] | null
  tri?: string | string[] | null
  thematiques?: string | string[] | null
}

const searchParamToThemes = (themesParam?: string | string[] | null) => {
  if (themesParam == null) return []

  return Array.isArray(themesParam) ? themesParam : [themesParam]
}

const categoryPagePaths: { [category in Category]: string } = {
  'Culture numérique': '/culture-numerique',
  'Communs & souveraineté': '/communs-et-souverainete',
  'Inclusion numérique': '/inclusion-numerique',
  'Numérique & environnement': '/numerique-et-environnement',
}

const CategoryPage = async ({
  params,
  searchParams: urlPaginationParams,
  category,
}: {
  params: {
    searchSegment: string
  }
  searchParams: CategoryPageUrlParams
  category: Category
}) => {
  const user = await getSessionUser()
  const categoriesCount = await getHomeCategoriesCount()
  const categoryCounts = categoriesCount[category]
  const themeOptions = categoryThemesOptions[category]
  const categoryPath = categoryPagePaths[category]
  const styles = categoryStyles[category]

  const searchParams = {
    ...searchParamsFromSegment(params?.searchSegment),
    themes: (urlPaginationParams.thematiques == null
      ? themeOptions.map(({ value }) => value as Theme)
      : searchParamToThemes(urlPaginationParams.thematiques)) as Theme[],
  }

  const paginationParams = sanitizeUrlPaginationParams(urlPaginationParams)

  const { resources, resourcesCount } = await executeResourcesSearch(
    searchParams,
    paginationParams,
    user,
  )

  return (
    <>
      <SkipLinksPortal />
      <div className="fr-container fr-mb-30v">
        <Breadcrumbs currentPage={category} />
        <div className="fr-container fr-container--medium">
          <ThematicHeader categoryCounts={categoryCounts} />
          <div className="fr-my-6w fr-text--center">
            <h2 className="fr-text--sm fr-text--uppercase">
              Découvrez les {categoryCounts.themes.length} thématiques{' '}
              {category}
            </h2>
            <ThematicTags
              className={styles.tagsClassName}
              categoryPath={categoryPath}
              themeOptions={themeOptions}
              selected={searchParamToThemes(urlPaginationParams.thematiques)}
              page={1}
              tri={urlPaginationParams.tri as Sorting}
            />
          </div>
          <main id={contentId}>
            <SearchResults
              paginationParams={paginationParams}
              count={resourcesCount}
              createPageLink={(page) =>
                createThematicLink(
                  categoryPath,
                  searchParamToThemes(urlPaginationParams.thematiques),
                )(page, urlPaginationParams.tri as Sorting)
              }
            >
              <ResourcesSearchResults
                resources={resources}
                user={user}
                totalCount={resourcesCount}
              >
                <ThematicLinkSortingSelect
                  categoryPath={categoryPath}
                  thematiques={searchParamToThemes(
                    urlPaginationParams.thematiques,
                  )}
                  paginationParams={paginationParams}
                  searchParams={searchParams}
                />
              </ResourcesSearchResults>
            </SearchResults>
          </main>
        </div>
      </div>
      <Newsletter />
    </>
  )
}

export default CategoryPage
