import classNames from 'classnames'
import React from 'react'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import styles from './CustomTag.module.css'

export enum TagColor {
  GREEN = 'green',
  GREY = 'grey',
  ORANGE = 'orange',
}

const CustomTag = ({
  label,
  icon,
  color,
  'data-testid': dataTestId,
  className,
}: UiComponentProps & {
  label: string
  icon: string
  color: TagColor
}) => (
  <span
    className={classNames(
      'fr-tag',
      'fr-tag--icon-left',
      'fr-text--medium',
      styles.tag,
      icon,
      styles[color],
      className,
    )}
    data-testid={dataTestId}
  >
    {label}
  </span>
)

export default CustomTag
