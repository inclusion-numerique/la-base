'use client'

import type { BaseTab } from '@app/web/app/(public)/bases/[slug]/(consultation)/BaseTab'
import { appendShareToken } from '@app/web/features/shareableLink/utils/shareTokenUtils'
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
      : lastSegment === 'ressources'
        ? 'ressources'
        : 'accueil'
}

const MenuItem = ({
  tab,
  href,
  currentTab,
  children,
  shareToken,
}: PropsWithChildren<{
  tab: BaseTab
  href: string
  currentTab: BaseTab
  shareToken?: string
}>) => (
  <li className="fr-nav__item">
    <Link
      className="fr-nav__link fr-display-block fr-link--md"
      href={appendShareToken(href, shareToken)}
      aria-current={currentTab === tab ? 'page' : undefined}
      data-testid={`${tab}-menu-button`}
    >
      {children}
    </Link>
  </li>
)

const BaseMenu = ({
  base,
  slug,
  shareToken,
}: {
  base: BasePageData
  slug: string
  shareToken?: string
}) => {
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
              href={`/bases/${slug}`}
              shareToken={shareToken}
            >
              Page d&apos;accueil
            </MenuItem>
            <MenuItem
              tab="ressources"
              currentTab={currentTab}
              href={`/bases/${slug}/ressources`}
              shareToken={shareToken}
            >
              Ressources · <b>{base.resources.length}</b>
            </MenuItem>
            <MenuItem
              tab="collections"
              currentTab={currentTab}
              href={`/bases/${slug}/collections`}
              shareToken={shareToken}
            >
              Collections · <b>{base.collections.length}</b>
            </MenuItem>
            <MenuItem
              tab="membres"
              currentTab={currentTab}
              href={`/bases/${slug}/membres`}
              shareToken={shareToken}
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
