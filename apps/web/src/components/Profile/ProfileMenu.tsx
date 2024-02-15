'use client'

import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ProfilePageData } from '@app/web/server/profiles/getProfile'
import type { ProfileTab } from '@app/web/app/(public)/profils/[slug]/(consultation)/ProfileTab'
import styles from './ProfileMenu.module.css'

const tabsMap: Map<string, ProfileTab> = new Map<string, ProfileTab>([
  ['bases', 'bases'],
  ['collections', 'collections'],
  ['suivis', 'suivis'],
  ['a-propos', 'a-propos'],
  ['ressources', 'ressources'],
])

const getCurrentTabFromPath = (path: string): ProfileTab =>
  tabsMap.get(path?.split('/').at(-1) ?? '') ?? 'ressources'

const MenuItem = ({
  tab,
  href,
  currentTab,
  children,
}: PropsWithChildren<{
  tab: ProfileTab
  href: string
  currentTab: ProfileTab
}>) => (
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

const ProfileMenu = ({
  profile,
  resourcesCount,
  basesCount,
  collectionsCount,
  followsCount,
  isConnectedUser,
}: {
  profile: ProfilePageData
  resourcesCount: number
  basesCount: number
  collectionsCount: number
  followsCount: number
  isConnectedUser: boolean
}) => {
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
              href={`/profils/${profile.slug}`}
            >
              {isConnectedUser ? 'Mes ressources' : 'Ressources'} ·{' '}
              <b>{resourcesCount}</b>
            </MenuItem>
            <MenuItem
              tab="collections"
              currentTab={currentTab}
              href={`/profils/${profile.slug}/collections`}
            >
              {isConnectedUser ? 'Mes collections' : 'Collections'} ·{' '}
              <b>{collectionsCount}</b>
            </MenuItem>
            <MenuItem
              tab="bases"
              currentTab={currentTab}
              href={`/profils/${profile.slug}/bases`}
            >
              {isConnectedUser ? 'Mes bases' : 'Bases'} · <b>{basesCount}</b>
            </MenuItem>
            {isConnectedUser && (
              <MenuItem
                tab="suivis"
                currentTab={currentTab}
                href={`/profils/${profile.slug}/suivis`}
              >
                {isConnectedUser ? 'Mes suivis' : 'Suivis'} ·{' '}
                <b>{followsCount}</b>
              </MenuItem>
            )}
            <MenuItem
              tab="a-propos"
              currentTab={currentTab}
              href={`/profils/${profile.slug}/a-propos`}
            >
              À propos
            </MenuItem>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default ProfileMenu
