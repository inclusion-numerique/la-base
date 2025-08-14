import Card from '@app/web/components/Card'
import { searchResultProfessionalSectorHref } from '@app/web/themes/searchResultHrefHelpers'
import ProgressBar from '@app/web/ui/ProgressBar'
import type { ProfessionalSector } from '@prisma/client'
import Link from 'next/link'

const ProfessionalSectors = ({
  professionalSectors,
}: {
  professionalSectors: {
    professionalSector: ProfessionalSector
    label: string
    value: number
    progress: number
  }[]
}) => {
  return (
    <Card title="Les 10 secteurs professionnels les plus utilisés">
      {professionalSectors.map(
        ({ label, progress, value, professionalSector }, index) => (
          <ProgressBar
            key={label}
            className="fr-mb-5v"
            ariaLabel={label}
            progress={progress}
            value={value}
            title={
              <Link
                href={searchResultProfessionalSectorHref(professionalSector)}
              >
                {label}
              </Link>
            }
            colorIndex={index}
          />
        ),
      )}
    </Card>
  )
}

export default ProfessionalSectors
