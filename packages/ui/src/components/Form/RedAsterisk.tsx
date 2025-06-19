import classNames from 'classnames'
import React from 'react'
import styles from './RedAsterisk.module.css'

const RedAsterisk = ({ className }: { className?: string }) => (
  <span className={classNames(styles.redAsterisk, className)}>*</span>
)

export default RedAsterisk
