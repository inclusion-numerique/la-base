import { Fragment, ReactNode } from 'react'

import classNames from 'classnames'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
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
      // eslint-disable-next-line react/no-array-index-key
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
