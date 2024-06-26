'use client'

import React from 'react'
import {
  PaginationParams,
  SearchParams,
} from '@app/web/server/search/searchQueryParams'
import { createThematicLink } from '@app/web/app/(public)/(categories)/_helpers/createThematicLink'
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
