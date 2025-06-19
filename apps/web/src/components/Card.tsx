import classNames from 'classnames'
import Link from 'next/link'
import React, { type ReactNode } from 'react'

const Card = ({
  id,
  className,
  'data-testid': dataTestid,
  title,
  titleAs: CardTitle = 'h3',
  href,
  enlargeLink = href != null,
  description,
  children,
  header,
  contentSeparator = false,
}: {
  id?: string
  className?: string
  'data-testid'?: string
  title: ReactNode
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  href?: string
  enlargeLink?: boolean
  description?: ReactNode
  children?: ReactNode
  header?: ReactNode
  contentSeparator?: boolean
}) => (
  <div
    id={id}
    data-testid={dataTestid}
    className={classNames(
      className,
      `fr-card ${enlargeLink && 'fr-enlarge-link'}`,
    )}
  >
    <div className="fr-card__body">
      <div className="fr-card__content">
        <CardTitle className="fr-card__title">
          {href ? <Link href={href}>{title}</Link> : title}
        </CardTitle>
        {description && <div className="fr-card__desc">{description}</div>}
        {children && (
          <div className="fr-card__end">
            {contentSeparator && <hr className="fr-pb-4w" />}
            {children}
          </div>
        )}
      </div>
    </div>
    {header ?? <div className="fr-card__header">{header}</div>}
  </div>
)

export default Card
