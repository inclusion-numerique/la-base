import { ReactNode } from 'react'

const ExternalLink = ({
  href,
  icon,
  children,
  ariaLabel,
}: {
  href: string | null
  icon?: string
  children: ReactNode
  ariaLabel?: string
}) =>
  href ? (
    <a
      href={href}
      className="fr-link"
      rel="noreferrer"
      target="_blank"
      aria-label={ariaLabel}
      title={ariaLabel || `${children} - nouvelle fenêtre`}
    >
      {icon && (
        <>
          <span role="img" className={icon} aria-hidden="true" />
          &nbsp;
        </>
      )}
      {children}
      <span className="fr-sr-only"> - nouvelle fenêtre</span>
    </a>
  ) : null

export default ExternalLink
