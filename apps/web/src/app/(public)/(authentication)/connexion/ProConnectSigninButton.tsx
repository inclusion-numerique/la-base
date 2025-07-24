'use client'

import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { proConnectProviderId } from '@app/web/auth/proConnect'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import type { Route } from 'next'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

const ProConnectSigninButton = ({
  className,
  callbackUrl,
}: {
  className?: string
  callbackUrl: Route
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const onClick = () => {
    if (isLoading) return
    setIsLoading(true)
    signIn(proConnectProviderId, { callbackUrl })
  }
  return (
    <div
      className={classNames(
        'fr-flex fr-direction-column fr-align-items-center fr-width-full',
        className,
      )}
    >
      <Button
        type="button"
        {...buttonLoadingClassname(
          isLoading,
          'fr-mb-4v fr-width-full fr-justify-content-center',
        )}
        onClick={onClick}
        title="S’identifier avec ProConnect"
      >
        <img src="/images/services/pro-connect-logo.svg" alt="" />
        <span className="fr-ml-1v fr-text--left">
          S’identifier avec&nbsp;
          <strong>ProConnect</strong>
        </span>
      </Button>

      <a
        className="fr-link fr-link--no-underline fr-text--underline"
        href="https://www.proconnect.gouv.fr/"
        target="_blank"
        rel="noreferrer"
      >
        En savoir plus sur ProConnect
      </a>
    </div>
  )
}

export default ProConnectSigninButton
