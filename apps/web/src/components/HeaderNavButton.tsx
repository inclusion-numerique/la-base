'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export function HeaderNavButton({
  matchPath,
  children,
  href,
  ariaLabel,
}: {
  matchPath: string
  children: ReactNode
  href: string
  ariaLabel: string
}) {
  const pathname = usePathname()
  const ariaCurrent = pathname?.startsWith(matchPath)
    ? ('page' as const)
    : undefined

  return (
    <Button
      linkProps={{
        href,
        'aria-label': ariaLabel,
        'aria-current': ariaCurrent,
      }}
    >
      {children}
    </Button>
  )
}
