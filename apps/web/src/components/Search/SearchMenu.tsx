'use client'

import { useSearchCounts } from '@app/web/app/(public)/rechercher/useSearchCounts'
import {
  type SearchParams,
  type SearchTab,
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import { numberToString } from '@app/web/utils/formatNumber'
import Link from 'next/link'
import styles from './Menu.module.css'

// While loading put spaces instead of the count to minimize layout shifts
const MenuCount = ({ count }: { count: number | null }) =>
  count === null ? (
    // We keep a few spaces to limit layout shifts when counts are loading -> available
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
  ) : (
    <>
      &nbsp;·&nbsp;
      <span className="fr-text--bold">{numberToString(count)}</span>
    </>
  )

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
      <div className="fr-container fr-container--800">
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
                <MenuCount count={resourcesCount} />
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
                <MenuCount count={basesCount} />
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
                <MenuCount count={profilesCount} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default SearchMenu
