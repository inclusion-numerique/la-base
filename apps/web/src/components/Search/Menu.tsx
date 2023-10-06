import React from 'react'
import Link from 'next/link'
import styles from './Menu.module.css'

const Menu = ({
  query,
  resourcesCount,
  profilesCount,
  basesCount,
  current,
}: {
  query?: string
  resourcesCount: number
  profilesCount: number
  basesCount: number
  current: 'resources' | 'profiles' | 'bases'
}) => (
  <div className={styles.menu}>
    <div className="fr-container">
      <nav className="fr-nav">
        <ul className="fr-nav__list">
          <li className="fr-nav__item">
            <Link
              className="fr-nav__link fr-link--md"
              href={`/rechercher?q=${encodeURI(query || '')}`}
              aria-current={current === 'resources' ? 'page' : undefined}
            >
              Ressources · <b>{resourcesCount}</b>
            </Link>
          </li>
          <li className="fr-nav__item">
            <Link
              className="fr-nav__link fr-link--md"
              href={`/rechercher/bases?q=${encodeURI(query || '')}`}
              aria-current={current === 'bases' ? 'page' : undefined}
            >
              Bases · <b>{basesCount}</b>
            </Link>
          </li>
          <li className="fr-nav__item">
            <Link
              className="fr-nav__link fr-link--md"
              href={`/rechercher/createurs?q=${encodeURI(query || '')}`}
              aria-current={current === 'profiles' ? 'page' : undefined}
            >
              Créateurs · <b>{profilesCount}</b>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)

export default Menu
