'use client'

import classNames from 'classnames'
import React, { useState } from 'react'
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
    <div className={styles.container}>
      {copied && <span className={styles.copiedHover}>Copié</span>}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        className={classNames(
          'fr-btn',
          'fr-btn--sm',
          'fr-btn--tertiary-no-outline',
          'fr-icon-links-line',
          'fr-icon--sm',
          className,
        )}
        type="button"
        title={title || `Copier le lien ${url} dans le presse-papier`}
        onClick={onCopy}
      />
    </div>
  )
}

export default CopyLinkButton
