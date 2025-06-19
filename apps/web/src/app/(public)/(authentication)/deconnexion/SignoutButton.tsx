'use client'

import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { generateProconnectSignoutUrl } from '@app/web/app/(public)/(authentication)/deconnexion/callback/proconnectSignout'
import Button from '@codegouvfr/react-dsfr/Button'
import type { ButtonProps } from '@codegouvfr/react-dsfr/src/Button'
import { signOut } from 'next-auth/react'
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
} & ButtonProps.Common) => {
  const [isLoading, setIsLoading] = useState(false)
  const onLogout = async () => {
    setIsLoading(true)

    // If user is logged in with ProConnect, we redirect to proconnect signout flow
    if (proConnectIdTokenHint) {
      window.location.href = generateProconnectSignoutUrl({
        origin: window.location.origin,
        callbackUrl,
        idTokenHint: proConnectIdTokenHint,
      })
      return
    }

    await signOut({ redirect: true, callbackUrl })
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
