'use client'

import IconInSquare from '@app/web/components/IconInSquare'
import { CATEGORY_VARIANTS, themeCategories } from '@app/web/themes/themes'
import { RiIconClassName } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import { Theme } from '@prisma/client'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './NewsFeedFilters.module.css'

export const NewsFeedThematicsFilters = ({ themes }: { themes: Theme[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button
        priority="tertiary no outline"
        className="fr-width-full fr-text-mention--black fr-text--start"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`ri-arrow-${isOpen ? 'down' : 'right'}-s-line fr-mr-1w`}
        />
        <span className="fr-text--uppercase fr-text--xs">
          Mes thématiques suivies
        </span>
      </Button>
      {isOpen && (
        <div>
          {themes.map((theme) => (
            <Button
              priority="tertiary no outline"
              className="fr-width-full fr-text-mention--grey"
            >
              <div className="fr-width-full fr-flex fr-align-items-center fr-justify-content-space-between">
                <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
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
                      styles.label,
                    )}
                  >
                    {themeCategories[theme]}
                  </span>
                </div>
                <span className="fr-mb-0 fr-text--xs">500</span>
              </div>
            </Button>
          ))}
        </div>
      )}
    </>
  )
}
