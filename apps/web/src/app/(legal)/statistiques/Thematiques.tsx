'use client'

import Card from '@app/web/components/Card'
import { searchResultThemeHref } from '@app/web/themes/searchResultHrefHelpers'
import ProgressBar from '@app/web/ui/ProgressBar'
import Button from '@codegouvfr/react-dsfr/Button'
import type { Theme } from '@prisma/client'
import classNames from 'classnames'
import Link from 'next/link'
import { useState } from 'react'

const Thematiques = ({
  thematiques,
}: {
  thematiques: {
    label: string
    theme: Theme
    value: number
    progress: number
  }[]
}) => {
  const [showAllThematiques, setShowAllThematiques] = useState(false)

  return (
    <Card
      className="fr-border fr-border-radius--8"
      noBorder
      titleClassName="fr-h6"
      title="Les thématiques les plus utilisées"
    >
      {thematiques
        .slice(0, showAllThematiques ? -1 : 10)
        .map((thematique, index) => (
          <ProgressBar
            key={thematique.label}
            className="fr-mb-5v"
            ariaLabel={thematique.label}
            title={
              <Link href={searchResultThemeHref(thematique.theme)}>
                {thematique.label}
              </Link>
            }
            progress={thematique.progress}
            value={thematique.value}
            colorIndex={index}
          />
        ))}
      <Button
        type="button"
        priority="tertiary no outline"
        size="small"
        onClick={() => setShowAllThematiques(!showAllThematiques)}
      >
        Voir {showAllThematiques ? 'moins de' : 'toutes les'} thématiques
        <span
          className={classNames('fr-ml-1v fr-text-label--blue-france', {
            'ri-arrow-up-s-line': showAllThematiques,
            'ri-arrow-down-s-line': !showAllThematiques,
          })}
        />
      </Button>
    </Card>
  )
}

export default Thematiques
