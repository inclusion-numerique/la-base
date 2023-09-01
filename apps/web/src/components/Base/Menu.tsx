import React from 'react'
import Link from 'next/link'
import { BasePageData } from '@app/web/server/bases/getBase'
import styles from './Menu.module.css'

const Menu = ({ base }: { base: BasePageData }) => (
  <div className={styles.menu}>
    <div className="fr-container">
      <nav className="fr-nav">
        <ul className="fr-nav__list">
          <li className="fr-nav__item">
            <Link
              className="fr-nav__link fr-link--md"
              href={`/bases/${base.slug}`}
              aria-current="page"
            >
              Ressources · <b>{base.resources.length}</b>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)

export default Menu
