import React from 'react'
import classNames from 'classnames'
import styles from './View.module.css'

const ViewSeparators = ({
  onlyLeft,
  withoutPadding,
}: {
  onlyLeft?: boolean
  withoutPadding?: boolean
}) => (
  <div
    className={classNames('fr-grid-row', styles.separatorRow, {
      [styles.separatorRowPadding]: !withoutPadding,
    })}
  >
    <div className={classNames(styles.leftColumn)}>
      <hr />
    </div>
    {!onlyLeft && (
      <div
        className={classNames('fr-hidden fr-unhidden-md', styles.rightColumn)}
      >
        <hr style={{ width: '100%' }} />
      </div>
    )}
  </div>
)

export default ViewSeparators
