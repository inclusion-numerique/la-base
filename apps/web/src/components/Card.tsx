import classNames from 'classnames'
import Link from 'next/link'
import React, { type ReactNode } from 'react'
import styles from './Card.module.css'

const Card = ({
  id,
  className,
  'data-testid': dataTestid,
  title,
  titleAs: CardTitle = 'h3',
  titleClassName,
  href,
  enlargeLink = href != null,
  description,
  children,
  header,
  contentSeparator = false,
  classes = {},
  noBorder = false,
}: {
  id?: string
  className?: string
  titleClassName?: string
  'data-testid'?: string
  title: ReactNode
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  href?: string
  enlargeLink?: boolean
  description?: ReactNode
  children?: ReactNode
  header?: ReactNode
  contentSeparator?: boolean
  classes?: {
    content?: string
  }
  noBorder?: boolean
}) => (
  <div
    id={id}
    data-testid={dataTestid}
    className={classNames(
      className,
      `fr-card ${enlargeLink && 'fr-enlarge-link'}`,
      noBorder && 'fr-card--no-border',
    )}
  >
    <div className="fr-card__body">
      <div className="fr-card__content fr-p-md-4w fr-p-3w">
        <CardTitle className={classNames('fr-card__title', titleClassName)}>
          {href ? <Link href={href}>{title}</Link> : title}
        </CardTitle>
        {description && <div className="fr-card__desc">{description}</div>}
        {children && (
          <div
            className={classNames(
              'fr-card__end',
              !title && 'fr-mt-0 fr-pt-0',
              classes.content,
              !title,
            )}
          >
            {contentSeparator && (
              <hr className={classNames('fr-pb-4w', styles.contentSeparator)} />
            )}
            {children}
          </div>
        )}
      </div>
    </div>
    {header ?? <div className="fr-card__header">{header}</div>}
  </div>
)

export default Card
