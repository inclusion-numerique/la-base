'use client'

import type { ProfileTab } from '@app/web/app/(public)/profils/[slug]/(consultation)/ProfileTab'
import type { ProfilePageData } from '@app/web/server/profiles/getProfile'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren } from 'react'

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
      className="fr-nav__link fr-display-block fr-link--md"
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
  isOwner,
}: {
  profile: ProfilePageData
  resourcesCount: number
  basesCount: number
  collectionsCount: number
  followsCount: number
  isOwner: boolean
}) => {
  const path = usePathname()
  const currentTab = getCurrentTabFromPath(path ?? '')

  return (
    <div className="fr-border-bottom fr-mb-md-6w fr-mb-4w">
      <div className="fr-container fr-flex-lg">
        <nav className="fr-nav fr-mx-auto">
          <ul className="fr-nav__list fr-justify-content-center">
            <MenuItem
              tab="ressources"
              currentTab={currentTab}
              href={`/profils/${profile.slug}`}
            >
              {isOwner ? 'Mes ressources' : 'Ressources'} ·{' '}
              <b>{resourcesCount}</b>
            </MenuItem>
            <MenuItem
              tab="collections"
              currentTab={currentTab}
              href={`/profils/${profile.slug}/collections`}
            >
              {isOwner ? 'Mes collections' : 'Collections'} ·{' '}
              <b>{collectionsCount}</b>
            </MenuItem>
            <MenuItem
              tab="bases"
              currentTab={currentTab}
              href={`/profils/${profile.slug}/bases`}
            >
              {isOwner ? 'Mes bases' : 'Bases'} · <b>{basesCount}</b>
            </MenuItem>
            {isOwner && (
              <MenuItem
                tab="suivis"
                currentTab={currentTab}
                href={`/profils/${profile.slug}/suivis`}
              >
                Mes suivis · <b>{followsCount}</b>
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
