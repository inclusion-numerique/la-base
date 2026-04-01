'use client'

import IconInSquare from '@app/web/components/IconInSquare'
import { createThemeUrl } from '@app/web/server/newsFeed/newsFeedUrls'
import {
  CATEGORY_VARIANTS,
  themeCategories,
  themeLabels,
} from '@app/web/themes/themes'
import { RiIconClassName } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import { Theme } from '@prisma/client'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import styles from '../../NewsFeedSearchFilters.module.css'
import commonStyles from './NewsFeedFilters.module.css'

export const NewsFeedThematicsFilters = ({
  themes,
  counts,
  params,
}: {
  themes: Theme[]
  counts: Record<Theme, { count: number }>
  params?: string
}) => {
  const [isOpen, setIsOpen] = useState(!!params)
  const [showAll, setShowAll] = useState(
    !!params && themes.findIndex((t) => t === params) > 4,
  )

  const listRef = useRef<HTMLUListElement>(null)
  const displayedThemes = showAll ? themes : themes.slice(0, 4)

  return (
    <>
      <div className="fr-position-relative">
        <Button
          priority="tertiary no outline"
          className={classNames(
            params === 'tout' && commonStyles.activeButton,
            'fr-text-mention--black fr-px-1v',
            commonStyles.absoluteButton,
          )}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-expanded={isOpen}
          aria-label={
            isOpen ? 'Masquer les thématiques' : 'Afficher les thématiques'
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
            href: createThemeUrl('tout'),
            'aria-current': params === 'tout' ? 'page' : undefined,
          }}
        >
          <span className="fr-text--uppercase fr-text--xs fr-pl-3v">
            Mes thématiques suivies
          </span>
        </Button>
      </div>
      {isOpen && (
        <ul ref={listRef} className="fr-raw-list fr-flex fr-direction-column">
          {displayedThemes.map((theme) => (
            <li key={theme}>
              <Button
                priority="tertiary no outline"
                className={classNames(
                  params === theme && commonStyles.activeButton,
                  'fr-width-full fr-text-mention--grey',
                  styles.button,
                )}
                linkProps={{
                  href: createThemeUrl(theme),
                  'aria-current': params === theme ? 'page' : undefined,
                }}
              >
                <div className="fr-width-full fr-flex fr-align-items-center fr-justify-content-space-between">
                  <div
                    className={classNames(
                      'fr-flex fr-align-items-center fr-flex-gap-2v',
                      styles.flexWidth,
                    )}
                  >
                    <IconInSquare
                      iconId={
                        CATEGORY_VARIANTS[themeCategories[theme]]
                          .icon as RiIconClassName
                      }
                      size="small"
                      className={
                        CATEGORY_VARIANTS[themeCategories[theme]].background
                      }
                      iconClassName={
                        CATEGORY_VARIANTS[themeCategories[theme]].color
                      }
                    />
                    <span
                      className={classNames(
                        'fr-mb-0 fr-text--xs fr-text--start',
                        styles.flexWidth,
                        commonStyles.label,
                      )}
                    >
                      {themeLabels[theme]}
                    </span>
                  </div>
                  <span
                    className={classNames('fr-mb-0 fr-text--xs', styles.count)}
                  >
                    {counts[theme].count}
                    <span className="fr-sr-only"> ressources</span>
                  </span>
                </div>
              </Button>
            </li>
          ))}
          <li className="fr-pb-4v">
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
                {showAll ? ' de thématiques' : ' les thématiques'}
              </span>
            </Button>
          </li>
        </ul>
      )}
    </>
  )
}
