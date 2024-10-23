import React from 'react'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SearchBar from '@app/web/components/Search/SearchBar'

export const rechercherId = 'rechercher'

const SearchHeader = () => (
  <div className="fr-background-alt--blue-france">
    <div className="fr-container">
      <Breadcrumbs
        currentPage="Rechercher"
        className="fr-m-0 fr-pt-2w fr-pb-5w"
      />
      <div id={rechercherId} className="fr-pt-1w fr-pb-6w">
        <SearchBar searchParamsFromUrl />
      </div>
    </div>
  </div>
)

export default SearchHeader
