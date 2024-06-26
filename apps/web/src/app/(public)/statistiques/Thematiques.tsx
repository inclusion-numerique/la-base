'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { useState } from 'react'
import Link from 'next/link'
import type { Theme } from '@prisma/client'
import Card from '@app/web/components/Card'
import ProgressBar from '@app/web/ui/ProgressBar'
import { searchResultThemeHref } from '@app/web/themes/searchResultHrefHelpers'

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
    <Card title="Les 10 thématiques les plus utilisées">
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
        priority="tertiary"
        size="small"
        onClick={() => setShowAllThematiques(!showAllThematiques)}
      >
        Voir {showAllThematiques ? 'moins de' : 'toutes les'} thématiques
      </Button>
    </Card>
  )
}

export default Thematiques
