'use client'

import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import Button from '@codegouvfr/react-dsfr/Button'
import type { ButtonProps } from '@codegouvfr/react-dsfr/src/Button'
import { type ReactNode, useState } from 'react'

const SignoutButton = ({
  children = 'Se déconnecter',
  callbackUrl = '/',
  className,
  proConnectIdTokenHint,
  ...buttonProps
}: {
  children?: ReactNode
  // If you want to log out from ProConnect, you need to pass the id_token_hint
  proConnectIdTokenHint?: string | null
  callbackUrl?: string
} & ButtonProps.Common &
  ButtonProps.AsButton) => {
  const [isLoading, setIsLoading] = useState(false)
  const onLogout = async () => {
    setIsLoading(true)

    // Use server route to orchestrate provider logout and fallback
    const params = new URLSearchParams({ callbackUrl })
    window.location.href = `/deconnexion/start?${params.toString()}`
  }

  return (
    <Button
      type="button"
      onClick={onLogout}
      {...buttonProps}
      {...buttonLoadingClassname(isLoading, className)}
    >
      {children}
    </Button>
  )
}

export default SignoutButton
