import Link from 'next/link'
import React from 'react'
import classNames from 'classnames'
import { externalImageLoader } from '@app/web/utils/externalImageLoader'
import styles from './LinkPreview.module.css'

const LinkPreview = ({
  title,
  description,
  url,
  imageUrl,
  faviconUrl,
}: {
  title?: string | null
  description?: string | null
  url: string
  imageUrl?: string | null
  faviconUrl?: string | null
}) => (
  <Link href={url} target="_blank" className={styles.linkPreview}>
    <div className={styles.contents} data-testid="link-preview">
      {(!!title || !!description) && (
        <div className={styles.titleAndDescription}>
          {!!title && (
            <p className={classNames('fr-text--bold', styles.title)}>{title}</p>
          )}
          {!!description && (
            <p
              className={classNames(
                'fr-hint-text fr-mt-2v',
                styles.description,
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}
      <div className={classNames('fr-mt-2v', styles.urlContainer)}>
        {faviconUrl ? (
          <picture>
            <img
              src={externalImageLoader({ src: faviconUrl, width: 24 })}
              className={styles.favicon}
              alt=""
            />
          </picture>
        ) : (
          <span
            className={classNames(
              'fr-icon--sm fr-icon-link fr-mr-1w',
              styles.icon,
            )}
          />
        )}
        <p className={classNames('fr-mb-0', styles.url)}>{url}</p>
      </div>
    </div>
    {!!imageUrl && (
      <div className={styles.imageContainer}>
        <picture>
          <img
            src={externalImageLoader({ src: imageUrl, width: 200 })}
            className={styles.image}
            alt={title ?? ''}
          />
        </picture>
      </div>
    )}
  </Link>
)

export default LinkPreview
