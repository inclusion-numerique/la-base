import React from 'react'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SearchBar from '@app/web/components/Search/SearchBar'
import styles from './Header.module.css'

export const rechercherId = 'rechercher'

const SearchHeader = () => (
  <div className={styles.container}>
    <div className="fr-container">
      <Breadcrumbs currentPage="Rechercher" />
      <div id={rechercherId} className="fr-my-6w">
        <SearchBar searchParamsFromUrl />
      </div>
    </div>
  </div>
)

export default SearchHeader
