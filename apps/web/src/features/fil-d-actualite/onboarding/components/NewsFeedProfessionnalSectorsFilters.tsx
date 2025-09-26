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
import styles from './NewsFeedFilters.module.css'

export const NewsFeedProfessionnalSectorsFilters = ({
  sectors,
}: {
  sectors: ProfessionalSector[]
}) => {
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
          Mon secteur professionnel
        </span>
      </Button>
      {isOpen && (
        <div className="fr-flex fr-direction-column fr-flex-gap-2v fr-flex-gap-2v">
          {sectors.map((ps) => (
            <Button
              priority="tertiary no outline"
              className="fr-width-full fr-text-mention--grey"
            >
              <div className="fr-width-full fr-flex fr-align-items-center fr-justify-content-space-between">
                <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
                  <IconInSquare
                    iconId={professionalSectorsIcon[ps]}
                    size="small"
                  />
                  <span
                    className={classNames(
                      'fr-mb-0 fr-text--xs fr-text--start',
                      styles.label,
                    )}
                  >
                    {professionalSectorsLabels[ps]}
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
