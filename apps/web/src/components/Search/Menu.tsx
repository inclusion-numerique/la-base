import React from 'react'
import Link from 'next/link'
import {
  SearchParams,
  searchParamsToUrl,
} from '@app/web/server/search/searchQueryParams'
import styles from './Menu.module.css'

// While loading put spaces instead of the count to minimize layout shifts
const menuCount = (count: number | null) =>
  count === null ? '   ' : ` · ${count}`

/**
 * Null counts means it's loading
 */
const Menu = ({
  searchParams,
  resourcesCount,
  profilesCount,
  basesCount,
}: {
  searchParams: SearchParams
  resourcesCount: number | null
  profilesCount: number | null
  basesCount: number | null
}) => (
  // Todo Plural

  <div className={styles.menu}>
    <div className="fr-container">
      <nav className="fr-nav">
        <ul className="fr-nav__list">
          <li className="fr-nav__item">
            <Link
              className="fr-nav__link fr-link--md"
              href={searchParamsToUrl({
                ...searchParams,
                tab: 'ressources',
              })}
              aria-current={
                searchParams.tab === 'ressources' ? 'page' : undefined
              }
            >
              Ressources
              {menuCount(resourcesCount)}
            </Link>
          </li>
          <li className="fr-nav__item">
            <Link
              className="fr-nav__link fr-link--md"
              href={searchParamsToUrl({
                ...searchParams,
                tab: 'bases',
              })}
              aria-current={searchParams.tab === 'bases' ? 'page' : undefined}
            >
              Bases
              {menuCount(basesCount)}
            </Link>
          </li>
          <li className="fr-nav__item">
            <Link
              className="fr-nav__link fr-link--md"
              href={searchParamsToUrl({
                ...searchParams,
                tab: 'profils',
              })}
              aria-current={searchParams.tab === 'profils' ? 'page' : undefined}
            >
              Profils
              {menuCount(profilesCount)}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)

export default Menu
