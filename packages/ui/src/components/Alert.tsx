import React from 'react'
import classNames from 'classnames'
import { UiComponentProps } from '../utils/uiComponentProps'

type CommonProps = {
  type: 'success' | 'error' | 'info' | 'warning'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

type SmallAlertProps = {
  title?: string
  description: string
  small: true
}

type AlertProps = {
  title: string
  description?: string
  small?: undefined
}

const Alert = ({
  className,
  as = 'h3',
  title,
  description,
  type,
  small,
}: UiComponentProps & CommonProps & (SmallAlertProps | AlertProps)) => {
  const Title = as
  return (
    <div
      className={classNames(
        'fr-alert',
        `fr-alert--${type}`,
        { 'fr-alert--sm': small },
        className,
      )}
    >
      {title && <Title className="fr-alert__title">{title}</Title>}
      {description && <p>{description}</p>}
    </div>
  )
}

export default Alert