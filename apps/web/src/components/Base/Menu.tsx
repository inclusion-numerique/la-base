import React from 'react'
import Link from 'next/link'
import { BasePageData } from '@app/web/server/bases/getBase'
import styles from './Menu.module.css'

const Menu = ({
  base,
  current,
}: {
  base: BasePageData
  current: 'resources' | 'members' | 'a-propos' | 'collections'
}) => (
  <div className={styles.menu}>
    <div className="fr-container">
      <nav className="fr-nav">
        <ul className="fr-nav__list">
          <li className="fr-nav__item">
            <Link
              className="fr-nav__link fr-link--md"
              href={`/bases/${base.slug}`}
              aria-current={current === 'resources' ? 'page' : undefined}
            >
              Ressources · <b>{base.resources.length}</b>
            </Link>
          </li>
          <li className="fr-nav__item">
            <Link
              className="fr-nav__link fr-link--md"
              href={`/bases/${base.slug}/collections`}
              aria-current={current === 'collections' ? 'page' : undefined}
            >
              Collections · <b>{base.collections.length}</b>
            </Link>
          </li>
          <li className="fr-nav__item">
            <Link
              className="fr-nav__link fr-link--md"
              href={`/bases/${base.slug}/membres`}
              aria-current={current === 'members' ? 'page' : undefined}
            >
              Membres · <b>{base.members.length}</b>
            </Link>
          </li>
          <li className="fr-nav__item">
            <Link
              className="fr-nav__link fr-link--md"
              href={`/bases/${base.slug}/a-propos`}
              aria-current={current === 'a-propos' ? 'page' : undefined}
            >
              À propos
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)

export default Menu
