'use client'

import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './CopyLinkButton.module.css'

const CopyLinkButton = ({
  url,
  title,
  className,
}: {
  url: string
  title?: string
  className?: string
}) => {
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
    navigator.clipboard.writeText(url)
  }

  return (
    <button
      className={classNames(
        'fr-btn fr-btn--sm fr-btn--tertiary-no-outline',
        styles.button,
        className,
      )}
      type="button"
      title={title || `Copier le lien ${url} dans le presse-papier`}
      onClick={onCopy}
      onKeyDown={(event) => event.key === 'Enter' && onCopy()}
    >
      {copied && <span className={styles.copiedHover}>Copié</span>}
      <span className="fr-icon-links-line fr-icon--sm" aria-hidden="true" />
    </button>
  )
}

export default CopyLinkButton
