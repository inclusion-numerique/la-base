'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import Tooltip from '@codegouvfr/react-dsfr/Tooltip'
import classNames from 'classnames'
import { type ReactNode, useState } from 'react'
import styles from './CopyLinkButton.module.css'

const CopyLinkButton = ({
  className,
  url,
  title,
  children,
  size = 'medium',
  full = false,
  priority = 'tertiary',
  displayIcon = true,
  withTooltip = true,
}: {
  className?: string
  url: string
  title?: string
  children?: ReactNode
  size?: 'medium' | 'small'
  full?: boolean
  priority?: 'primary' | 'secondary' | 'tertiary' | 'tertiary no outline'
  displayIcon?: boolean
  withTooltip?: boolean
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
      {withTooltip ? (
        <Tooltip title={title || `Copier le lien ${url} dans le presse-papier`}>
          <Button
            className={classNames(
              full ? 'fr-width-full fr-justify-content-center' : '',
              className,
            )}
            iconId={displayIcon ? 'fr-icon-link' : undefined}
            size={size}
            priority={priority}
            type="button"
            title={title || `Copier le lien ${url} dans le presse-papier`}
            onClick={onCopy}
          >
            {children}
          </Button>
        </Tooltip>
      ) : (
        <Button
          className={classNames(
            full ? 'fr-width-full fr-justify-content-center' : '',
            className,
          )}
          iconId={displayIcon ? 'fr-icon-link' : undefined}
          size={size}
          priority={priority}
          type="button"
          title={title || `Copier le lien ${url} dans le presse-papier`}
          onClick={onCopy}
        >
          {children}
        </Button>
      )}
    </span>
  )
}

export default CopyLinkButton
