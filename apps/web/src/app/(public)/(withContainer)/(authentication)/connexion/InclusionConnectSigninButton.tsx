'use client'

import classNames from 'classnames'
import { Route } from 'next'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Spinner } from '@app/web/ui/Spinner'
import { inclusionConnectProviderId } from '@app/web/auth/inclusionConnect'
import styles from './InclusionConnectSigninButton.module.css'

const InclusionConnectSigninButton = ({
  className,
  callbackUrl,
}: {
  className?: string
  callbackUrl: Route
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const onClick = () => {
    setIsLoading(true)
    signIn(inclusionConnectProviderId, { callbackUrl })
  }
  return (
    <div className={classNames(styles.inclusionConnectSection, className)}>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={classNames(
            styles.inclusionConnectBtn,
            'fr-btn',
            isLoading && styles.loading,
          )}
          disabled={isLoading}
          title="S'identifier avec InclusionConnect"
          onClick={onClick}
        >
          <span>
            S&apos;identifier&nbsp;avec <strong>InclusionConnect</strong>
          </span>
        </button>
        {isLoading && <Spinner size="small" />}
      </div>

      <a
        className="fr-link fr-link--sm"
        href="https://plateforme-inclusion.notion.site/Un-compte-unique-pour-mes-services-num-riques-ded9135197654da590f5dde41d8bb68b"
        target="_blank"
        rel="noreferrer"
        title="Qu’est-ce qu'Inclusion Connect ? - nouvelle fenêtre"
      >
        Qu’est-ce qu’Inclusion Connect&nbsp;?
      </a>
    </div>
  )
}

export default InclusionConnectSigninButton
