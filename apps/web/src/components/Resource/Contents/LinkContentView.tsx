'use client'

import ContentMetrics from '@app/web/components/Resource/Contents/ContentMetrics'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { ResourceContent } from '@app/web/server/resources/getResource'
import { trpc } from '@app/web/trpc'
import classNames from 'classnames'
import Link from 'next/link'
import LinkContentPreview from './LinkContentPreview'
import styles from './LinkContentView.module.css'

const LinkContentView = ({
  content: {
    id,
    title,
    caption,
    showPreview,
    url,
    linkImageUrl,
    linkTitle,
    linkDescription,
    linkFaviconUrl,
    linkClickCount,
  },
}: {
  content: Pick<
    ResourceContent,
    | 'id'
    | 'title'
    | 'caption'
    | 'showPreview'
    | 'url'
    | 'linkTitle'
    | 'linkDescription'
    | 'linkImageUrl'
    | 'linkFaviconUrl'
  > & {
    linkClickCount?: number | null
  }
}) => {
  const trackEvent = trpc.content.trackEvent.useMutation()

  const handleLinkClick = () => {
    trackEvent.mutate({ contentId: id, type: 'linkClick' })
  }

  return (
    <div data-testid="content-link">
      {!!title && <h2 className="fr-mb-4v fr-h6">{title}</h2>}
      {showPreview && !!url ? (
        <LinkContentPreview
          url={url}
          imageUrl={linkImageUrl}
          faviconUrl={linkFaviconUrl}
          title={linkTitle}
          description={linkDescription}
          onLinkClick={handleLinkClick}
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
            <Link
              target="_blank"
              href={url}
              className="fr-link"
              onClick={handleLinkClick}
            >
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
      <ContentMetrics type="link" clickCount={linkClickCount ?? null} />
    </div>
  )
}

export default withTrpc(LinkContentView)
