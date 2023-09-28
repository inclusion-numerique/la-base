'use client'

import classNames from 'classnames'
import React, { ReactNode, useState } from 'react'
import { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import styles from './CopyLinkButton.module.css'

const CopyLinkButton = ({
  url,
  title,
  className,
  children,
  priority,
}: {
  url: string
  title?: string
  className?: string
  children?: ReactNode
  priority?: ButtonProps.Common['priority']
}) => {
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
    navigator.clipboard.writeText(url).catch()
  }

  return (
    <div className={styles.container}>
      {copied && <span className={styles.copiedHover}>Copié</span>}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        className={classNames(
          'fr-btn',
          'fr-btn--sm',
          `fr-btn--${
            priority ? priority.replace(' ', '-') : 'tertiary-no-outline'
          }`,
          'fr-icon-links-line',
          'fr-icon--sm',
          className,
          {
            'fr-btn--icon-left': children,
          },
        )}
        type="button"
        title={title || `Copier le lien ${url} dans le presse-papier`}
        onClick={onCopy}
      >
        {children}
      </button>
    </div>
  )
}

export default CopyLinkButton
