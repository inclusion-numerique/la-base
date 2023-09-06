import React from 'react'
import Link from 'next/link'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import styles from './Menu.module.css'

const Menu = ({
  profile,
  resourcesCount,
  basesCount,
  currentPage,
}: {
  profile: ProfilePageData
  resourcesCount: number
  basesCount: number
  currentPage: string
}) => (
  <div className={styles.menu}>
    <div className="fr-container">
      <nav className="fr-nav">
        <ul className="fr-nav__list">
          <li className="fr-nav__item">
            <Link
              className="fr-nav__link fr-link--md"
              href={`/profils/${profile.id}`}
              aria-current={currentPage === '/' ? 'page' : undefined}
            >
              Mes ressources · <b>{resourcesCount}</b>
            </Link>
          </li>
          <li className="fr-nav__item">
            <Link
              data-testid="bases-menu-button"
              className="fr-nav__link fr-link--md"
              href={`/profils/${profile.id}/bases`}
              aria-current={currentPage === '/bases' ? 'page' : undefined}
            >
              Mes bases · <b>{basesCount}</b>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)

export default Menu
