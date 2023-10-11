import React from 'react'
import { SearchParams } from '@app/web/server/search/searchQueryParams'
import Menu from '@app/web/components/Search/Menu'
import LoadingResultsContainer from '@app/web/app/(public)/rechercher/LoadingResultsContainer'

const LoadingSearchResults = ({
  searchParams,
}: {
  searchParams: SearchParams | null
}) => (
  <>
    <Menu
      searchParams={searchParams}
      resourcesCount={null}
      profilesCount={null}
      basesCount={null}
    />
    <LoadingResultsContainer />
  </>
)

export default LoadingSearchResults
