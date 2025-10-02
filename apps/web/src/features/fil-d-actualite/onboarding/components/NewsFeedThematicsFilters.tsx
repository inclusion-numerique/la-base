'use client'

import IconInSquare from '@app/web/components/IconInSquare'
import {
  CATEGORY_VARIANTS,
  themeCategories,
  themeLabels,
} from '@app/web/themes/themes'
import { RiIconClassName } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import { Theme } from '@prisma/client'
import classNames from 'classnames'
import { useState } from 'react'
import styles from '../../NewsFeedSearchFilters.module.css'
import commonStyles from './NewsFeedFilters.module.css'

export const NewsFeedThematicsFilters = ({
  themes,
  counts,
  searchParams,
}: {
  themes: Theme[]
  counts: Record<Theme, { count: number }>
  searchParams?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const displayedThemes = showAll ? themes : themes.slice(0, 4)

  return (
    <>
      <div className="fr-position-relative">
        <Button
          priority="tertiary no outline"
          className={classNames(
            searchParams === 'tous' && commonStyles.activeButton,
            'fr-text-mention--black fr-px-1v',
            commonStyles.absoluteButton,
          )}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <span className={`ri-arrow-${isOpen ? 'down' : 'right'}-s-line`} />
        </Button>
        <Button
          priority="tertiary no outline"
          className={classNames(
            searchParams === 'tous' && commonStyles.activeButton,
            'fr-text-mention--black fr-text--start fr-width-full',
            commonStyles.linkButton,
          )}
          linkProps={{ href: '/fil-d-actualite?thematique=tous' }}
        >
          <span className="fr-text--uppercase fr-text--xs fr-pl-3v">
            Mes thématiques suivies
          </span>
        </Button>
      </div>
      {isOpen && (
        <div className="fr-flex fr-direction-column">
          {displayedThemes.map((theme) => (
            <Button
              key={theme}
              priority="tertiary no outline"
              className={classNames(
                'fr-width-full fr-text-mention--grey',
                styles.button,
              )}
              linkProps={{ href: `/fil-d-actualite?thematique=${theme}` }}
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
                    title={themeLabels[theme]}
                  >
                    {themeLabels[theme]}
                  </span>
                </div>
                <span
                  className={classNames('fr-mb-0 fr-text--xs', styles.count)}
                >
                  {counts[theme].count}
                </span>
              </div>
            </Button>
          ))}
          <Button
            priority="tertiary no outline"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? 'Voir moins' : 'Tout voir'}
          </Button>
        </div>
      )}
    </>
  )
}
