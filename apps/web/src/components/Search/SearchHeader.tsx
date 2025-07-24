import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SearchBar from '@app/web/components/Search/SearchBar'

export const rechercherId = 'rechercher'

const SearchHeader = () => (
  <div className="fr-background-alt--blue-france">
    <div className="fr-container">
      <Breadcrumbs currentPage="Rechercher" className="fr-m-0 fr-py-4v" />
      <div id={rechercherId} className="fr-pb-6v">
        <SearchBar searchParamsFromUrl />
      </div>
    </div>
  </div>
)

export default SearchHeader
