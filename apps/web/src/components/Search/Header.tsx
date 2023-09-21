import React from 'react'
import Breadcrumbs from '../Breadcrumbs'
import SearchResource from './SearchBar'
import styles from './Header.module.css'

const Header = ({ query }: { query?: string }) => (
  <div className={styles.container}>
    <div className="fr-container">
      <Breadcrumbs currentPage="Rechercher" />
      <div className="fr-my-6w">
        <SearchResource query={query} />
      </div>
    </div>
  </div>
)

export default Header
