import type { TooltipProps } from 'recharts'
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'
import { ReactNode } from 'react'
import { numberToString } from '@app/web/utils/formatNumber'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import styles from './CustomTooltip.module.css'

const CustomTooltip = <TValue extends ValueType, TName extends NameType>({
  active,
  payload,
  label,
  // Formatter is a function that takes the value, name, and the payload and returns a string
  formatter,
  labelFormatter,
}: TooltipProps<TValue, TName>) => {
  if (active && payload && payload.length > 0) {
    const title = labelFormatter
      ? (labelFormatter(label, payload) as ReactNode)
      : (label as ReactNode)

    return (
      <div className={styles.tooltip}>
        <p className={styles.title}>{title}</p>
        {payload.map((item, index) => {
          const formatedName = formatter
            ? formatter(
                item.value as TValue,
                item.name as TName,
                item,
                index,
                payload,
              )
            : item.name

          return (
            <p key={item.name} className={styles.series}>
              {isDefinedAndNotNull(formatedName) ? (
                <span>
                  {formatter
                    ? formatter(
                        item.value as TValue,
                        item.name as TName,
                        item,
                        index,
                        payload,
                      )
                    : item.name}
                </span>
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
