import { Fragment, type ReactNode } from 'react'

import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import classNames from 'classnames'
import styles from './AdministrationInlineLabelsValues.module.css'

export type LabelAndValue = {
  label: ReactNode
  value: ReactNode
}

const AdministrationInlineLabelsValues = ({
  items,
  className,
}: {
  items: (LabelAndValue | undefined | null)[]
  className?: string
}) => (
  <div className={classNames(styles.grid, className)}>
    {items.filter(isDefinedAndNotNull).map(({ label, value }, index) => (
      <Fragment key={index}>
        <p className="fr-text--sm fr-mb-0">
          <strong>{label}&nbsp;:</strong>
        </p>
        <div>{value}</div>
      </Fragment>
    ))}
  </div>
)

export default AdministrationInlineLabelsValues
