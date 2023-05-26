import classNames from 'classnames'
import { Route } from 'next'
import Link from 'next/link'
import React from 'react'
import styles from './IconLink.module.css'

const IconLink = ({
  title,
  icon,
  href,
  small,
}: {
  title: string
  icon: string
  href: Route
  small?: boolean
}) => (
  <Link
    title={title}
    className={classNames(
      'fr-btn',
      'fr-btn--tertiary-no-outline',
      'fr-btn--sm',
      icon,
      styles.iconLink,
      { 'fr-icon--sm': small },
    )}
    href={href}
  />
)

export default IconLink
