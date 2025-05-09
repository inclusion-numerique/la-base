import type { ResourceContent } from '@app/web/server/resources/getResource'
import classNames from 'classnames'
import Link from 'next/link'
import LinkContentPreview from './LinkContentPreview'
import styles from './LinkContentView.module.css'

const LinkContentView = ({
  content: {
    title,
    caption,
    showPreview,
    url,
    linkImageUrl,
    linkTitle,
    linkDescription,
    linkFaviconUrl,
  },
}: {
  content: Pick<
    ResourceContent,
    | 'title'
    | 'caption'
    | 'showPreview'
    | 'url'
    | 'linkTitle'
    | 'linkDescription'
    | 'linkImageUrl'
    | 'linkFaviconUrl'
  >
}) => (
  <div data-testid="content-link">
    {!!title && <h2 className="fr-mb-4v fr-h6">{title}</h2>}
    {showPreview && !!url ? (
      <LinkContentPreview
        url={url}
        imageUrl={linkImageUrl}
        faviconUrl={linkFaviconUrl}
        title={linkTitle}
        description={linkDescription}
      />
    ) : (
      url && (
        <div className={styles.urlContainer}>
          <span
            className={classNames(
              styles.iconLink,
              'fr-icon-link',
              'fr-icon--sm',
            )}
          />
          <Link target="_blank" href={url} className="fr-link">
            {url}
          </Link>
        </div>
      )
    )}
    {!!caption && (
      <p className="fr-text--sm fr-mt-4v fr-mb-0" data-testid="link-caption">
        {caption}
      </p>
    )}
  </div>
)

export default LinkContentView
