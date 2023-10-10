import React from 'react'
import { SearchParams } from '@app/web/server/search/searchQueryParams'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SearchBar from '@app/web/components/Search/SearchBar'
import styles from './Header.module.css'

const Header = ({ searchParams }: { searchParams: SearchParams }) => (
  <div className={styles.container}>
    <div className="fr-container">
      <Breadcrumbs currentPage="Rechercher" />
      <div className="fr-my-6w">
        <SearchBar searchParams={searchParams} />
      </div>
    </div>
  </div>
)

export default Header
