import classNames from 'classnames'
import Link from 'next/link'
import { ResourceContent } from '@app/web/server/resources/getResource'
import LinkPreview from './LinkPreview'
import styles from './LinkView.module.css'

const LinkView = ({
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
    <h6 className="fr-mb-2w">{title}</h6>
    {showPreview && !!url ? (
      <LinkPreview
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

export default LinkView
