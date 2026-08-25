import { numberToString } from '@app/web/utils/formatNumber'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import type { ReactNode } from 'react'
import type { TooltipContentProps } from 'recharts'
import styles from './CustomTooltip.module.css'

const CustomTooltip = ({
  active,
  payload,
  label,
  // Formatter is a function that takes the value, name, and the payload and returns a string
  formatter,
  labelFormatter,
}: TooltipContentProps) => {
  if (active && payload && payload.length > 0) {
    const title = labelFormatter
      ? labelFormatter(label, payload)
      : (label as ReactNode)

    return (
      <div className={styles.tooltip}>
        <p className={styles.title}>{title}</p>
        {payload.map((item, index) => {
          const formatedName = formatter
            ? formatter(item.value, item.name, item, index, payload)
            : item.name

          return (
            <p key={item.name} className={styles.series}>
              {isDefinedAndNotNull(formatedName) ? (
                <span>{formatedName}</span>
              ) : null}
              <span className="fr-text--bold">
                {typeof item.value === 'number'
                  ? numberToString(item.value)
                  : item.value}
              </span>
            </p>
          )
        })}
      </div>
    )
  }

  return null
}

export default CustomTooltip
