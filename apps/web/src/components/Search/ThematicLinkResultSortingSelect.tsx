'use client'

import { createThematicLink } from '@app/web/app/(public)/(categories)/_helpers/createThematicLink'
import type {
  PaginationParams,
  SearchParams,
} from '@app/web/server/search/searchQueryParams'
import ResultSortingSelect from './ResultSortingSelect'

export const ThematicLinkSortingSelect = ({
  paginationParams,
  searchParams,
  thematiques,
  categoryPath,
}: {
  paginationParams: PaginationParams
  searchParams: SearchParams
  thematiques: string[]
  categoryPath: string
}) => (
  <ResultSortingSelect
    paginationParams={paginationParams}
    searchParams={searchParams}
    tab="ressources"
    createSortingLink={(sort) =>
      createThematicLink(categoryPath, thematiques)(1, sort)
    }
  />
)
