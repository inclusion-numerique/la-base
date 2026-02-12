'use client'

import Link from 'next/link'
import { type ReactNode, useId } from 'react'

export type CustomBreadcrumbsProps = {
  ariaLabel?: string
  className?: string
  homeLinkProps?: { href: string; className?: string }
  segments?: {
    label: ReactNode
    linkProps: { href: string; className?: string }
  }[]
  currentPageLabel: ReactNode
}

const CustomBreadcrumbs = ({
  ariaLabel = "Fil d'ariane",
  className,
  homeLinkProps,
  segments = [],
  currentPageLabel,
}: CustomBreadcrumbsProps) => {
  const breadcrumbId = `breadcrumb-${useId()}`

  const allSegments = [
    ...(homeLinkProps
      ? [{ linkProps: homeLinkProps, label: 'Accueil' as ReactNode }]
      : []),
    ...segments,
  ]

  return (
    <nav
      role="navigation"
      className={['fr-breadcrumb', className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
    >
      <button
        className="fr-breadcrumb__button"
        aria-expanded={false}
        aria-controls={breadcrumbId}
      >
        Voir le fil d&apos;Ariane
      </button>
      <div className="fr-collapse" id={breadcrumbId}>
        <ol className="fr-breadcrumb__list">
          {allSegments.map(({ linkProps, label }, i) => (
            <li key={i}>
              <Link
                {...linkProps}
                className={['fr-breadcrumb__link', linkProps.className]
                  .filter(Boolean)
                  .join(' ')}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a className="fr-breadcrumb__link" aria-current="page">
              {currentPageLabel}
            </a>
          </li>
        </ol>
      </div>
    </nav>
  )
}

export default CustomBreadcrumbs
