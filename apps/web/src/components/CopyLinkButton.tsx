'use client'

import classNames from 'classnames'
import React, { ReactNode, useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import styles from './CopyLinkButton.module.css'

const CopyLinkButton = ({
  className,
  url,
  title,
  children,
  size = 'medium',
  full = false,
  priority = 'tertiary',
}: {
  className?: string
  url: string
  title?: string
  children?: ReactNode
  size?: 'medium' | 'small'
  full?: boolean
  priority?: 'primary' | 'secondary' | 'tertiary' | 'tertiary no outline'
}) => {
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    navigator.clipboard.writeText(url).catch()
  }

  return (
    <span
      className={classNames(
        full ? 'fr-width-full fr-position-relative' : 'fr-position-relative',
        className,
      )}
    >
      {copied && (
        <span className={styles.copiedHover}>
          Lien copié dans le presse-papier
        </span>
      )}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <Button
        className={classNames(
          full ? 'fr-width-full fr-justify-content-center' : '',
          className,
        )}
        iconId="fr-icon-links-line"
        size={size}
        priority={priority}
        type="button"
        title={title || `Copier le lien ${url} dans le presse-papier`}
        onClick={onCopy}
      >
        {children}
      </Button>
    </span>
  )
}

export default CopyLinkButton
