import React from 'react'
import classNames from 'classnames'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import styles from './CustomTag.module.css'

export enum TagColor {
  GREEN = 'green',
  GREY = 'grey',
}

const CustomTag = ({
  label,
  icon,
  color,
  'data-testid': dataTestId,
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
      icon,
      styles[color],
    )}
    data-testid={dataTestId}
  >
    {label}
  </span>
)

export default CustomTag
