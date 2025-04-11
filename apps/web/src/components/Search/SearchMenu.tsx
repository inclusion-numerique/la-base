'use client'

import React from 'react'
import Link from 'next/link'
import {
  defaultSearchParams,
  SearchParams,
  SearchTab,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import { useSearchCounts } from '@app/web/app/(public)/rechercher/useSearchCounts'
import { numberToString } from '@app/web/utils/formatNumber'
import styles from './Menu.module.css'

// While loading put spaces instead of the count to minimize layout shifts
const menuCount = (count: number | null) =>
  count === null ? '   ' : ` · ${numberToString(count)}`

const SearchMenu = ({
  activeTab,
  searchParams,
}: {
  activeTab: SearchTab
  searchParams: SearchParams | null
}) => {
  const { resourcesCount, profilesCount, basesCount } = useSearchCounts()

  return (
    <div className={styles.menu}>
      <div className="fr-container">
        <nav className="fr-nav">
          <ul className="fr-nav__list">
            <li className="fr-nav__item">
              <Link
                className="fr-nav__link fr-link--md"
                href={searchUrl(
                  'ressources',
                  searchParams ?? defaultSearchParams,
                )}
                aria-disabled={!searchParams}
                aria-current={
                  !!searchParams && activeTab === 'ressources'
                    ? 'page'
                    : undefined
                }
              >
                Ressources
                {menuCount(resourcesCount)}
              </Link>
            </li>
            <li className="fr-nav__item">
              <Link
                className="fr-nav__link fr-link--md"
                href={searchUrl('bases', searchParams ?? defaultSearchParams)}
                aria-disabled={!searchParams}
                aria-current={
                  !!searchParams && activeTab === 'bases' ? 'page' : undefined
                }
              >
                Bases
                {menuCount(basesCount)}
              </Link>
            </li>
            <li className="fr-nav__item">
              <Link
                className="fr-nav__link fr-link--md"
                href={searchUrl('profils', searchParams ?? defaultSearchParams)}
                aria-disabled={!searchParams}
                aria-current={
                  !!searchParams && activeTab === 'profils' ? 'page' : undefined
                }
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
}

export default SearchMenu
