'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

const SignoutButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const onLogout = async () => {
    setIsLoading(true)
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <Button
      type="button"
      onClick={onLogout}
      {...buttonLoadingClassname(isLoading)}
    >
      Se déconnecter
    </Button>
  )
}

export default SignoutButton
