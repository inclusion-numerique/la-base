'use client'

import React, { ReactNode, useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import styles from './CopyLinkButton.module.css'

const CopyLinkButton = ({
  url,
  title,
  children,
}: {
  url: string
  title?: string
  children?: ReactNode
}) => {
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    navigator.clipboard.writeText(url).catch()
  }

  return (
    <div className={styles.container}>
      {copied && (
        <span className={styles.copiedHover}>
          Lien copié dans le presse-papier
        </span>
      )}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <Button
        className="fr-width-full fr-justify-content-center fr-pl-2w"
        iconId="fr-icon-links-line"
        priority="tertiary"
        type="button"
        title={title || `Copier le lien ${url} dans le presse-papier`}
        onClick={onCopy}
      >
        {children}
      </Button>
    </div>
  )
}

export default CopyLinkButton
