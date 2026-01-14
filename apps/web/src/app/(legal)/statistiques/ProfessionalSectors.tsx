'use client'

import Card from '@app/web/components/Card'
import type { ProfessionalSector } from '@prisma/client'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const chartColors = [
  'var(--blue-ecume-850-200)',
  'var(--blue-france-sun-113-625)',
  'var(--blue-ecume-925-125-active)',
  'var(--blue-cumulus-925-125)',
]

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
  const chartData = professionalSectors.map((item) => ({
    name: item.label,
    value: item.value,
    professionalSector: item.professionalSector,
  }))

  return (
    <Card
      className="fr-border fr-border-radius--8"
      noBorder
      title="Les secteurs professionnels les plus utilisés"
      titleClassName="fr-h6"
    >
      <div className="fr-flex fr-direction-column fr-direction-sm-row fr-align-items-center fr-flex-gap-4v">
        <div style={{ width: 80, height: 80 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={16}
                outerRadius={32}
                fill="#8884d8"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="fr-flex fr-direction-column fr-flex-gap-2v fr-width-full">
          {professionalSectors.map((item, index) => (
            <div
              key={item.label}
              className="fr-flex fr-align-items-center fr-flex-gap-2v fr-justify-content-space-between"
            >
              <span
                className="ri-checkbox-blank-circle-fill"
                aria-hidden="true"
                style={{ color: chartColors[index % chartColors.length] }}
              />
              <span className="fr-text--sm fr-mb-0">{item.label}</span>
              <div className="fr-flex fr-ml-auto">
                <span className="fr-text--sm fr-text--bold fr-mb-0">
                  {item.value}
                </span>
                <span className="fr-text--sm fr-text--medium fr-mb-0">
                  &nbsp;·&nbsp;
                  {item.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default ProfessionalSectors
