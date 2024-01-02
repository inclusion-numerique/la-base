'use client'

import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BasePageData } from '@app/web/server/bases/getBase'
import { BaseTab } from '@app/web/app/(public)/bases/[slug]/(consultation)/BaseTab'
import styles from './BaseMenu.module.css'

const getCurrentTabFromPath = (path: string): BaseTab => {
  const lastSegment = path?.split('/').at(-1) ?? ''

  return lastSegment === 'collections'
    ? 'collections'
    : lastSegment === 'membres'
      ? 'membres'
      : lastSegment === 'a-propos'
        ? 'a-propos'
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
      className="fr-nav__link fr-link--md"
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

  return (
    <div className={styles.menu}>
      <div className="fr-container">
        <nav className="fr-nav">
          <ul className="fr-nav__list">
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
              Collections ·{' '}
              <b>{base.collections.length + base.savedCollections.length}</b>
            </MenuItem>
            <MenuItem
              tab="membres"
              currentTab={currentTab}
              href={`/bases/${base.slug}/membres`}
            >
              Membres · <b>{base.members.length}</b>
            </MenuItem>
            <MenuItem
              tab="a-propos"
              currentTab={currentTab}
              href={`/bases/${base.slug}/a-propos`}
            >
              À propos
            </MenuItem>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default BaseMenu
