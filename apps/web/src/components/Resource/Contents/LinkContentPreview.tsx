import ExternalLink from '@app/ui/components/ExternalLink'
import { externalImageLoader } from '@app/web/utils/externalImageLoader'
import classNames from 'classnames'
import styles from './LinkContentPreview.module.css'

const LinkContentPreview = ({
  title,
  description,
  url,
  imageUrl,
  faviconUrl,
  onLinkClick,
}: {
  title?: string | null
  description?: string | null
  url: string
  imageUrl?: string | null
  faviconUrl?: string | null
  onLinkClick?: () => void
}) => (
  <div className={styles.linkPreview}>
    <div
      className={classNames(styles.contents, 'fr-enlarge-link')}
      data-testid="link-preview"
    >
      {(!!title || !!description) && (
        <div className={styles.titleAndDescription}>
          {!!title && (
            <p className={classNames('fr-text--bold', styles.title)}>
              <ExternalLink
                href={url}
                className={styles.titleLink}
                onClick={onLinkClick}
              >
                {title}
              </ExternalLink>
            </p>
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
          />
        </picture>
      </div>
    )}
  </div>
)

export default LinkContentPreview
