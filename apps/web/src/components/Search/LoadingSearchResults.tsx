import React from 'react'
import { SearchParams } from '@app/web/server/search/searchQueryParams'
import Menu from '@app/web/components/Search/Menu'
import EmptyBox from '@app/web/components/EmptyBox'
import { Spinner } from '@app/web/ui/Spinner'

const LoadingSearchResults = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => (
  <>
    <Menu
      searchParams={searchParams}
      resourcesCount={null}
      profilesCount={null}
      basesCount={null}
    />
    <div className="fr-container">
      <EmptyBox title="" className="fr-mt-11v">
        <Spinner />
      </EmptyBox>
    </div>
  </>
)

export default LoadingSearchResults
