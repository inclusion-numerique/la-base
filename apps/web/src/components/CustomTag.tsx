import classNames from 'classnames'
import React from 'react'
import styles from './CustomTag.module.css'

export enum TagColor {
  GREEN = 'green',
  GREY = 'grey',
}

const CustomTag = ({
  label,
  icon,
  color,
}: {
  label: string
  icon: string
  color: TagColor
}) => (
  <span
    className={classNames(
      'fr-tag',
      'fr-tag--icon-left',
      'fr-text--medium',
      icon,
      styles[color],
    )}
  >
    {label}
  </span>
)

export default CustomTag
