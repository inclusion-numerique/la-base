'use client'

import CustomTooltip from '@app/web/app/(public)/statistiques/CustomTooltip'
import type { StatisticsLegend } from '@app/web/app/(public)/statistiques/StatisticsLegend'
import Card from '@app/web/components/Card'
import { numberToString } from '@app/web/utils/formatNumber'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const chartColors = [
  { fill: 'var(--blue-france-sun-113-625)' },
  { fill: 'var(--blue-ecume-925-125-active)' },
  { fill: 'var(--blue-cumulus-925-125)' },
]

const StatisticsTooltip = <T extends object>({
  tooltipLabelDataKey,
  legends = [],
}: {
  tooltipLabelDataKey?: keyof T
  legends?: StatisticsLegend<T>[]
}) => (
  <Tooltip
    wrapperClassName="fr-text--sm fr-text-default--grey "
    isAnimationActive={false}
    content={<CustomTooltip />}
    cursor={{ fill: 'var(--background-alt-blue-france)' }}
    labelFormatter={(label, payload) => {
      const labelAsString = `${label}`
      if (!tooltipLabelDataKey) return labelAsString

      return (
        `${(payload[0]?.payload as T)[tooltipLabelDataKey]}` || null
      )
    }}
    formatter={(_value, name) =>
      legends.find((legend) => legend.key === name)?.label
    }
  />
)

const MAX_BARS = 4

const StatisticsChart = <T extends object>({
  data,
  title,
  xAxisDataKey,
  tooltipLabelDataKey,
  dataKeys,
  legends = [],
  showLegendBelowChart = false,
  titleClassName,
}: {
  data: T[]
  title: string
  xAxisDataKey: keyof T
  tooltipLabelDataKey?: keyof T
  dataKeys: (keyof T)[]
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
        {data.length > MAX_BARS ? (
          <AreaChart data={data} margin={{}}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            {StatisticsTooltip({ tooltipLabelDataKey, legends })}
            <YAxis
              width={54}
              fontSize={10}
              tickFormatter={numberToString}
              allowDecimals={false}
            />
            {dataKeys.map((dataKey, index) => (
              <Area
                key={dataKey.toString()}
                stackId="stack-0"
                dataKey={dataKey.toString()}
                fill={chartColors[index].fill}
              />
            ))}
          </AreaChart>
        ) : (
          <BarChart data={data} margin={{}}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            {StatisticsTooltip({ tooltipLabelDataKey, legends })}
            <XAxis
              dataKey={xAxisDataKey.toString()}
              interval={0}
              fontSize={10}
            />
            <YAxis
              width={54}
              fontSize={10}
              tickFormatter={numberToString}
              allowDecimals={false}
            />
            {dataKeys.map((dataKey, index) => (
              <Bar
                key={dataKey.toString()}
                stackId="stack-0"
                barSize={35}
                dataKey={dataKey.toString()}
                fill={chartColors[index].fill}
              />
            ))}
          </BarChart>
        )}
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
                style={{ color: chartColors[index].fill }}
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

export default StatisticsChart
