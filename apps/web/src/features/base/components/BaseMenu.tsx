'use client'

import type { BaseTab } from '@app/web/app/(public)/bases/[slug]/(consultation)/BaseTab'
import type { BasePageData } from '@app/web/server/bases/getBase'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren } from 'react'
import styles from './BaseMenu.module.css'

const getCurrentTabFromPath = (path: string): BaseTab => {
  const lastSegment = path?.split('/').at(-1) ?? ''

  return lastSegment === 'collections'
    ? 'collections'
    : lastSegment === 'membres'
      ? 'membres'
      : lastSegment === 'accueil'
        ? 'accueil'
        : 'ressources'
}

const MenuItem = ({
  tab,
  href,
  currentTab,
  children,
}: PropsWithChildren<{ tab: BaseTab; href: string; currentTab: BaseTab }>) => (
  <li className="fr-nav__item">
    <Link
      className="fr-nav__link fr-display-block fr-link--md"
      href={href}
      aria-current={currentTab === tab ? 'page' : undefined}
      data-testid={`${tab}-menu-button`}
    >
      {children}
    </Link>
  </li>
)

const BaseMenu = ({ base }: { base: BasePageData }) => {
  const path = usePathname()
  const currentTab = getCurrentTabFromPath(path ?? '')
  const acceptedMembers = base.members.filter((member) => member.accepted)
  return (
    <div className={styles.menu}>
      <div className="fr-container">
        <nav className="fr-nav">
          <ul className="fr-nav__list">
            <MenuItem
              tab="accueil"
              currentTab={currentTab}
              href={`/bases/${base.slug}/accueil`}
            >
              Page d'accueil
            </MenuItem>
            <MenuItem
              tab="ressources"
              currentTab={currentTab}
              href={`/bases/${base.slug}`}
            >
              Ressources · <b>{base.resources.length}</b>
            </MenuItem>
            <MenuItem
              tab="collections"
              currentTab={currentTab}
              href={`/bases/${base.slug}/collections`}
            >
              Collections · <b>{base.collections.length}</b>
            </MenuItem>
            <MenuItem
              tab="membres"
              currentTab={currentTab}
              href={`/bases/${base.slug}/membres`}
            >
              Membres · <b>{acceptedMembers.length}</b>
            </MenuItem>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default BaseMenu
