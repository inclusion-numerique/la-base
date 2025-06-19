'use client'

import Card from '@app/web/components/Card'
import { searchResultTargetAudienceHref } from '@app/web/themes/searchResultHrefHelpers'
import ProgressBar from '@app/web/ui/ProgressBar'
import Button from '@codegouvfr/react-dsfr/Button'
import type { TargetAudience } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'

const TargetAudiences = ({
  targetAudiences,
}: {
  targetAudiences: {
    targetAudience: TargetAudience
    label: string
    value: number
    progress: number
  }[]
}) => {
  const [showAllPublics, setShowAllPublics] = useState(false)

  return (
    <Card title="Les 10 publics cibles les plus utilisés">
      {targetAudiences
        .slice(0, showAllPublics ? -1 : 10)
        .map(({ label, progress, value, targetAudience }, index) => (
          <ProgressBar
            key={label}
            className="fr-mb-5v"
            ariaLabel={label}
            progress={progress}
            value={value}
            title={
              <Link href={searchResultTargetAudienceHref(targetAudience)}>
                {label}
              </Link>
            }
            colorIndex={index}
          />
        ))}
      <Button
        type="button"
        priority="tertiary"
        size="small"
        onClick={() => setShowAllPublics(!showAllPublics)}
      >
        Voir {showAllPublics ? 'moins de' : 'tous les'} publics cibles
      </Button>
    </Card>
  )
}

export default TargetAudiences
