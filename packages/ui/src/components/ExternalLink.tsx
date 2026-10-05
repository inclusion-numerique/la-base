import { userContentLinkRel } from '@app/ui/utils/userContentLinks'
import { type AnchorHTMLAttributes, type ReactNode } from 'react'

const ExternalLink = ({
  href,
  icon,
  children,
  ariaLabel,
  className = 'fr-link',
  userContent = false,
  ...rest
}: {
  href: string | null
  icon?: string
  children: ReactNode
  ariaLabel?: string
  className?: string
  // Lien saisi par un utilisateur : ne doit pas transmettre d'autorité SEO
  userContent?: boolean
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'target' | 'rel' | 'className' | 'children'
>) =>
  href ? (
    <a
      href={href}
      className={className}
      rel={userContent ? userContentLinkRel : 'noopener noreferrer'}
      target="_blank"
      aria-label={ariaLabel}
      {...rest}
    >
      {icon && (
        <>
          <span role="img" className={icon} aria-hidden="true" />
          &nbsp;
        </>
      )}
      {children}
      {!ariaLabel && (
        <span className="fr-sr-only"> Ouverture dans un nouvel onglet</span>
      )}
    </a>
  ) : null

export default ExternalLink
