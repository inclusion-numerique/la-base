import React from 'react'
import classNames from 'classnames'
import styles from './Separator.module.css'

const Separator = ({ className }: { className?: string }) => (
  <div className={classNames(styles.separator, className)} />
)

export default Separator
