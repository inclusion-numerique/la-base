'use client'

import {
  type PaginationParams,
  type SearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import React from 'react'
import ResultSortingSelect from './ResultSortingSelect'

export const SearchUrlResultSortingSelect = ({
  paginationParams,
  searchParams,
  tab,
}: {
  paginationParams: PaginationParams
  searchParams: SearchParams
  tab: 'ressources' | 'bases' | 'profils'
}) => (
  <ResultSortingSelect
    paginationParams={paginationParams}
    searchParams={searchParams}
    tab={tab}
    createSortingLink={(sort) =>
      searchUrl(tab, searchParams, {
        ...paginationParams,
        sort,
        page: 1,
      })
    }
  />
)
