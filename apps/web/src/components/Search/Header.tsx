import React from 'react'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SearchBar from '@app/web/components/Search/SearchBar'
import styles from './Header.module.css'

const Header = () => (
  <div className={styles.container}>
    <div className="fr-container">
      <Breadcrumbs currentPage="Rechercher" />
      <div className="fr-my-6w">
        <SearchBar searchParamsFromUrl />
      </div>
    </div>
  </div>
)

export default Header
