'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { type ReactNode, useState } from 'react'
import styles from './CopyLinkButton.module.css'

const CopyLinkButton = ({
  context,
  className,
  url,
  title,
  children,
  size = 'medium',
  full = false,
  priority = 'tertiary',
  displayIcon = true,
}: {
  context: 'base' | 'collection' | 'resource' | 'profile'
  className?: string
  url: string
  title?: string
  children?: ReactNode
  size?: 'medium' | 'small'
  full?: boolean
  priority?: 'primary' | 'secondary' | 'tertiary' | 'tertiary no outline'
  displayIcon?: boolean
}) => {
  const contextLabels: Record<string, string> = {
    base: 'de la base',
    collection: 'de la collection',
    resource: 'de la ressource',
    profile: 'du profil',
  }

  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    navigator.clipboard.writeText(url).catch()
  }
  return (
    <span className={classNames(full && 'fr-width-full', className)}>
      {copied && (
        <span className={styles.copiedHover}>
          Lien copié dans le presse-papier
        </span>
      )}
      <Button
        className={classNames(
          styles.button,
          full ? 'fr-width-full fr-justify-content-center' : '',
          className,
        )}
        iconId={displayIcon ? 'fr-icon-link' : undefined}
        size={size}
        priority={priority}
        type="button"
        title={title || `Copier le lien ${contextLabels[context]}`}
        onClick={onCopy}
      >
        {children}
        {!children && (
          <span className="fr-sr-only">
            Copier le lien {contextLabels[context]}
          </span>
        )}
      </Button>
    </span>
  )
}

export default CopyLinkButton
