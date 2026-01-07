'use client'

import CustomTooltip from '@app/web/app/(legal)/statistiques/CustomTooltip'
import type { StatisticsLegend } from '@app/web/app/(legal)/statistiques/StatisticsLegend'
import Card from '@app/web/components/Card'
import { numberToString } from '@app/web/utils/formatNumber'
import classNames from 'classnames'
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
import styles from './StatisticsChart.module.css'

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

      return `${(payload[0]?.payload as T)[tooltipLabelDataKey]}` || null
    }}
    formatter={(_value, name) =>
      legends.find((legend) => legend.key === name)?.label
    }
  />
)

const MAX_BARS = 12

const Legend = <T extends object>({
  legends,
  legend,
  layout = 'vertical',
}: {
  legends: StatisticsLegend<T>[]
  legend?: 'above' | 'below' | 'belowTitle'
  layout?: 'vertical' | 'horizontal'
}) => (
  <div
    className={classNames('fr-text--sm fr-mb-0', {
      'fr-mt-2w': layout === 'vertical',
      'fr-flex fr-direction-column fr-direction-sm-row fr-flex-gap-md-12v':
        layout === 'horizontal' && legend !== 'belowTitle',
      [styles.horizontalLegendMobile]: layout === 'horizontal',
    })}
  >
    {legends.map((item, index) => (
      <div
        key={item.label}
        className={classNames('fr-flex', {
          'fr-justify-content-space-between': layout === 'vertical',
          'fr-direction-row fr-align-items-center fr-justify-content-space-between':
            layout === 'horizontal',
        })}
      >
        {(item.total || item.value) && (
          <span
            className={classNames({
              'fr-text--normal': layout === 'horizontal',
            })}
          >
            {!!item.key && (
              <span
                className="ri-checkbox-blank-circle-fill fr-mr-1w"
                aria-hidden="true"
                style={{ color: chartColors[index].fill }}
              />
            )}
            {item.label}
          </span>
        )}
        {(item.total || item.value) && (
          <span
            className={classNames({
              'fr-ml-1w': layout === 'horizontal',
            })}
          >
            <span className="fr-text--bold">{item.total}</span>
            {item.value && (
              <>
                &nbsp;·&nbsp;
                <span className="fr-text--normal">{item.value}</span>
              </>
            )}
          </span>
        )}
      </div>
    ))}
  </div>
)

const StatisticsChart = <T extends object>({
  data,
  title,
  xAxisDataKey,
  tooltipLabelDataKey,
  dataKeys,
  legends = [],
  legend,
  titleClassName,
}: {
  data: T[]
  title: string
  xAxisDataKey: keyof T
  tooltipLabelDataKey?: keyof T
  dataKeys: (keyof T)[]
  legends?: StatisticsLegend<T>[]
  legend?: 'above' | 'below' | 'belowTitle'
  titleClassName?: string
}) => {
  const titleContent =
    legend && ['belowTitle', 'above'].includes(legend) && legends.length > 0 ? (
      <div
        className={classNames(
          'fr-flex fr-justify-content-space-between fr-align-items-start fr-flex-wrap',
          {
            'fr-direction-column fr-mb-1w': legend === 'belowTitle',
            'fr-direction-row': legend === 'above',
          },
        )}
      >
        <h3 className={titleClassName ?? 'fr-h5'}>{title}</h3>
        <Legend legends={legends} layout="horizontal" legend={legend} />
      </div>
    ) : (
      <h3 className={titleClassName ?? 'fr-h5'}>{title}</h3>
    )

  return (
    <Card
      className="fr-border fr-border-radius--8"
      noBorder
      title={titleContent}
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
      {legend === 'below' && legends.length > 0 && <Legend legends={legends} />}
    </Card>
  )
}

export default StatisticsChart
