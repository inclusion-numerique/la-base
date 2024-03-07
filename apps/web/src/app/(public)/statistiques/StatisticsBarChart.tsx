'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Card from '@app/web/components/Card'
import { numberToString } from '@app/web/utils/formatNumber'
import CustomTooltip from '@app/web/app/(public)/statistiques/CustomTooltip'
import type { StatisticsLegend } from '@app/web/app/(public)/statistiques/StatisticsLegend'

const barColors = [
  {
    barFill: 'var(--blue-france-sun-113-625)',
    activeBarFill: 'var(--blue-france-sun-113-625)',
  },
  {
    barFill: 'var(--blue-ecume-925-125-active)',
    activeBarFill: 'var(--blue-ecume-925-125-active)',
  },
  {
    barFill: 'var(--blue-cumulus-925-125)',
    activeBarFill: 'var(--blue-cumulus-925-125)',
  },
]

const StatisticsBarChart = <T extends object>({
  data,
  title,
  xAxisDataKey,
  tooltipLabelDataKey,
  barsDataKey,
  legends = [],
  showLegendBelowChart = false,
  titleClassName,
}: {
  data: T[]
  title: string
  xAxisDataKey: keyof T
  tooltipLabelDataKey?: keyof T
  barsDataKey: (keyof T)[]
  legends?: StatisticsLegend<T>[]
  showLegendBelowChart?: boolean
  titleClassName?: string
}) => (
  <Card
    title={<h3 className={titleClassName ?? 'fr-h5'}>{title}</h3>}
    titleAs="div"
  >
    <div style={{ height: 240, marginLeft: -32 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{}}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip
            wrapperClassName="fr-text--sm fr-text-default--grey "
            isAnimationActive={false}
            content={<CustomTooltip />}
            cursor={{ fill: 'var(--background-alt-blue-france)' }}
            labelFormatter={(label, payload) => {
              const labelAsString = `${label}`
              if (!tooltipLabelDataKey) return labelAsString

              return (
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `${(payload[0]?.payload as T)[tooltipLabelDataKey]}` ?? null
              )
            }}
            formatter={(_value, name) =>
              legends.find((legend) => legend.key === name)?.label
            }
          />
          <XAxis dataKey={xAxisDataKey.toString()} interval={0} fontSize={10} />
          <YAxis width={54} fontSize={10} tickFormatter={numberToString} />
          {barsDataKey.map((barDataKey, index) => (
            <Bar
              key={barDataKey.toString()}
              stackId="stack-0"
              barSize={35}
              dataKey={barDataKey.toString()}
              fill={barColors[index].barFill}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
    {showLegendBelowChart && legends.length > 0 && (
      <div className="fr-text--sm fr-mt-2w fr-mb-0">
        {legends.map((item, index) => (
          <div
            key={item.label}
            className="fr-flex fr-justify-content-space-between"
          >
            <span>
              <span
                className="ri-checkbox-blank-circle-fill fr-mr-1w"
                aria-hidden="true"
                style={{ color: barColors[index].barFill }}
              />
              {item.label}
            </span>
            <span className="fr-text--bold">{item.value}</span>
          </div>
        ))}
      </div>
    )}
  </Card>
)

export default StatisticsBarChart
