'use client'

import type { ProfileTab } from '@app/web/app/(public)/profils/[slug]/(consultation)/ProfileTab'
import type { ProfilePageData } from '@app/web/server/profiles/getProfile'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren } from 'react'

const tabsMap: Map<string, ProfileTab> = new Map<string, ProfileTab>([
  ['bases', 'bases'],
  ['collections', 'collections'],
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
  ariaLabel,
}: PropsWithChildren<{
  tab: ProfileTab
  href: string
  currentTab: ProfileTab
  ariaLabel?: string
}>) => (
  <li className="fr-nav__item">
    <Link
      className="fr-nav__link fr-display-block fr-link--md"
      href={href}
      aria-current={currentTab === tab ? 'page' : undefined}
      data-testid={`${tab}-menu-button`}
      aria-label={ariaLabel}
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
  isOwner,
}: {
  profile: ProfilePageData
  resourcesCount: number
  basesCount: number
  collectionsCount: number
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
              ariaLabel={isOwner ? 'Mes ressources' : 'Ressources du profil'}
            >
              {isOwner ? 'Mes ressources' : 'Ressources'} ·{' '}
              <b>{resourcesCount}</b>
              <span className="fr-sr-only"> ressources</span>
            </MenuItem>
            <MenuItem
              tab="collections"
              currentTab={currentTab}
              href={`/profils/${profile.slug}/collections`}
              ariaLabel={isOwner ? 'Mes collections' : 'Collections du profil'}
            >
              {isOwner ? 'Mes collections' : 'Collections'} ·{' '}
              <b>{collectionsCount}</b>
              <span className="fr-sr-only"> collections</span>
            </MenuItem>
            <MenuItem
              tab="bases"
              currentTab={currentTab}
              href={`/profils/${profile.slug}/bases`}
              ariaLabel={isOwner ? 'Mes bases' : 'Bases du profil'}
            >
              {isOwner ? 'Mes bases' : 'Bases'} · <b>{basesCount}</b>
              <span className="fr-sr-only"> bases</span>
            </MenuItem>
            <MenuItem
              tab="a-propos"
              currentTab={currentTab}
              href={`/profils/${profile.slug}/a-propos`}
              ariaLabel="À propos, informations du profil"
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
