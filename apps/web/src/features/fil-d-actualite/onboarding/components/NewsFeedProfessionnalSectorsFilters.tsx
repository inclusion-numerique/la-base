'use client'

import IconInSquare from '@app/web/components/IconInSquare'
import {
  professionalSectorsIcon,
  professionalSectorsLabels,
} from '@app/web/themes/professionalSectors'
import Button from '@codegouvfr/react-dsfr/Button'
import { ProfessionalSector } from '@prisma/client'
import classNames from 'classnames'
import { useState } from 'react'
import styles from '../../NewsFeedSearchFilters.module.css'
import commonStyles from './NewsFeedFilters.module.css'

export const NewsFeedProfessionnalSectorsFilters = ({
  sectors,
  counts,
  searchParams,
}: {
  sectors: ProfessionalSector[]
  counts: Record<ProfessionalSector, { count: number }>
  searchParams?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fr-position-relative">
        <Button
          type="button"
          priority="tertiary no outline"
          className={classNames(
            searchParams === 'tous' && commonStyles.activeButton,
            'fr-text-mention--black fr-px-1v',
            commonStyles.absoluteButton,
          )}
          onClick={() => setIsOpen(!isOpen)}
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
          linkProps={{ href: '/fil-d-actualite?secteur=tous' }}
        >
          <span className="fr-text--uppercase fr-text--xs fr-pl-3v">
            Mon secteur professionnel
          </span>
        </Button>
      </div>
      {isOpen && (
        <div className="fr-flex fr-direction-column">
          {sectors.map((ps) => (
            <Button
              key={ps}
              priority="tertiary no outline"
              className={classNames(
                searchParams === ps && commonStyles.activeButton,
                'fr-width-full fr-text-mention--grey',
                styles.button,
              )}
              linkProps={{ href: `/fil-d-actualite?secteur=${ps}` }}
            >
              <div className="fr-width-full fr-flex fr-align-items-center fr-justify-content-space-between">
                <div
                  className={classNames(
                    'fr-flex fr-align-items-center fr-flex-gap-2v',
                    styles.flexWidth,
                  )}
                >
                  <IconInSquare
                    iconId={professionalSectorsIcon[ps]}
                    size="small"
                  />
                  <span
                    className={classNames(
                      'fr-mb-0 fr-text--xs fr-text--start',
                      styles.flexWidth,
                      commonStyles.label,
                      searchParams === ps && 'fr-text--bold',
                    )}
                  >
                    {professionalSectorsLabels[ps]}
                  </span>
                </div>
                <span
                  className={classNames('fr-mb-0 fr-text--xs', styles.count)}
                >
                  {counts[ps].count}
                </span>
              </div>
            </Button>
          ))}
        </div>
      )}
    </>
  )
}
