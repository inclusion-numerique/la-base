import classNames from 'classnames'
import React from 'react'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import styles from './CustomTag.module.css'

export enum TagColor {
  GREEN = 'green',
  GREY = 'grey',
  ORANGE = 'orange',
  BLUE = 'blue',
}

const CustomTag = ({
  label,
  small,
  icon,
  color,
  'data-testid': dataTestId,
  className,
}: UiComponentProps & {
  label?: string
  small?: boolean
  icon: string
  color: TagColor
}) => (
  <span
    className={classNames(
      {
        'fr-tag': label,
        'fr-tag--icon-left': label,
        'fr-text--medium': !small,
        'fr-tag--sm': small,
        [styles.iconOnly]: !label,
      },
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
