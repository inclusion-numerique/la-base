'use client'

import React, { ReactNode, useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import styles from './CopyLinkButton.module.css'

const CopyLinkButton = ({
  url,
  title,
  children,
  size = 'medium',
  full = false,
  priority = 'tertiary',
}: {
  url: string
  title?: string
  children?: ReactNode
  size?: 'medium' | 'small'
  full?: boolean
  priority?: 'tertiary' | 'tertiary-no-outline'
}) => {
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    navigator.clipboard.writeText(url).catch()
  }

  return (
    <span
      className={
        full ? 'fr-width-full fr-position-relative' : 'fr-position-relative'
      }
    >
      {copied && (
        <span className={styles.copiedHover}>
          Lien copié dans le presse-papier
        </span>
      )}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <Button
        className={full ? 'fr-width-full fr-justify-content-center' : ''}
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
