'use client'

import BaseImage from '@app/web/components/BaseImage'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import {
  NewsFeedBases,
  NewsFeedProfiles,
} from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import {
  createBaseUrl,
  createFollowsUrl,
  createProfileUrl,
} from '@app/web/server/newsFeed/newsFeedUrls'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import styles from '../../NewsFeedSearchFilters.module.css'
import commonStyles from './NewsFeedFilters.module.css'

export const NewsFeedBasesProfilesFilters = ({
  bases,
  profiles,
  baseCounts,
  profileCounts,
  params,
}: {
  bases: NewsFeedBases
  profiles: NewsFeedProfiles
  baseCounts: Record<string, { count: number }>
  profileCounts: Record<string, { count: number }>
  params?: string
}) => {
  const [isOpen, setIsOpen] = useState(!!params)
  const [showAll, setShowAll] = useState(
    !!params &&
      [
        ...bases.map(({ base }) => base.slug),
        ...profiles.map(({ profile }) => profile.slug),
      ].findIndex((slug) => slug === params) > 4,
  )

  const listRef = useRef<HTMLUListElement>(null)
  const allItems = [...bases, ...profiles]
  const displayedItems = showAll ? allItems : allItems.slice(0, 4)
  const displayedBases = displayedItems.filter(
    (item) => 'base' in item,
  ) as typeof bases
  const displayedProfiles = displayedItems.filter(
    (item) => 'profile' in item,
  ) as typeof profiles

  if (bases.length === 0 && profiles.length === 0) {
    return null
  }

  return (
    <>
      <div className="fr-position-relative">
        <Button
          type="button"
          priority="tertiary no outline"
          className={classNames(
            params === 'tout' && commonStyles.activeButton,
            commonStyles.absoluteButton,
            'fr-text-mention--black fr-px-1v',
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={
            isOpen
              ? 'Masquer les bases et profils suivis'
              : 'Afficher les bases et profils suivis'
          }
        >
          <span className={`ri-arrow-${isOpen ? 'down' : 'right'}-s-line`} />
        </Button>
        <Button
          priority="tertiary no outline"
          className={classNames(
            params === 'tout' && commonStyles.activeButton,
            'fr-text-mention--black fr-text--start fr-width-full',
            commonStyles.linkButton,
          )}
          linkProps={{
            href: createFollowsUrl(),
            'aria-current': params === 'tout' ? 'page' : undefined,
          }}
        >
          <span className="fr-text--uppercase fr-text--xs fr-pl-3v">
            Mes bases et profils suivis
          </span>
        </Button>
      </div>
      {isOpen && (
        <ul ref={listRef} className="fr-raw-list fr-flex fr-direction-column">
          {displayedBases.map(({ base }) => (
            <li key={base.id}>
              <Button
                priority="tertiary no outline"
                className={classNames(
                  params === base.slug && commonStyles.activeButton,
                  'fr-width-full fr-text-mention--grey',
                  styles.button,
                )}
                linkProps={{
                  href: createBaseUrl(base.slug),
                  'aria-current': params === base.slug ? 'page' : undefined,
                }}
              >
                <div className="fr-width-full fr-flex fr-align-items-center fr-justify-content-space-between">
                  <div
                    className={classNames(
                      'fr-flex fr-align-items-center fr-flex-gap-2v',
                      styles.flexWidth,
                    )}
                  >
                    <BaseImage base={base} />
                    <span
                      className={classNames(
                        'fr-mb-0 fr-text--xs fr-text--start',
                        styles.flexWidth,
                        commonStyles.label,
                        params === base.slug && 'fr-text--bold',
                      )}
                    >
                      {base.title}
                    </span>
                  </div>
                  <span
                    className={classNames('fr-mb-0 fr-text--xs', styles.count)}
                  >
                    {baseCounts[base.slug].count}
                    <span className="fr-sr-only"> ressources</span>
                  </span>
                </div>
              </Button>
            </li>
          ))}
          {displayedProfiles.map(({ profile }) => (
            <li key={profile.id}>
              <Button
                priority="tertiary no outline"
                className={classNames(
                  params === profile.slug && commonStyles.activeButton,
                  'fr-width-full fr-text-mention--grey',
                  styles.button,
                )}
                linkProps={{
                  href: createProfileUrl(profile.slug),
                  'aria-current': params === profile.slug ? 'page' : undefined,
                }}
              >
                <div className="fr-width-full fr-flex fr-align-items-center fr-justify-content-space-between">
                  <div
                    className={classNames(
                      'fr-flex fr-align-items-center fr-flex-gap-2v',
                      styles.flexWidth,
                    )}
                  >
                    <RoundProfileImage
                      className="fr-mr-1w"
                      user={profile}
                      size={24}
                    />
                    <span
                      className={classNames(
                        'fr-mb-0 fr-text--xs fr-text--start',
                        styles.flexWidth,
                        commonStyles.label,
                        params === profile.slug && 'fr-text--bold',
                      )}
                    >
                      {profile.name}
                    </span>
                  </div>
                  <span
                    className={classNames('fr-mb-0 fr-text--xs', styles.count)}
                  >
                    {profileCounts[profile.slug].count}
                    <span className="fr-sr-only"> ressources</span>
                  </span>
                </div>
              </Button>
            </li>
          ))}
          {allItems.length > 4 && (
            <li>
              <Button
                priority="tertiary no outline"
                aria-expanded={showAll}
                onClick={() => {
                  const wasShowingAll = showAll
                  setShowAll((prev) => !prev)
                  if (!wasShowingAll) {
                    setTimeout(() => {
                      const items =
                        listRef.current?.querySelectorAll('li a, li button')
                      if (items && items.length > 4) {
                        const firstNewItem = items[4] as HTMLElement
                        firstNewItem?.focus()
                      }
                    }, 0)
                  }
                }}
              >
                {showAll ? 'Voir moins' : 'Voir toutes'}
                <span className="fr-sr-only">
                  {showAll
                    ? ' de bases et profils suivis'
                    : ' les bases et profils suivis'}
                </span>
              </Button>
            </li>
          )}
        </ul>
      )}
    </>
  )
}
