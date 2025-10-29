import type { SessionUser } from '@app/web/auth/sessionUser'
import BaseImage from '@app/web/components/BaseImage'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import BaseMetadata from '@app/web/features/base/components/BaseMetadata'
import type { BaseProfileListItem } from '@app/web/server/bases/getBasesList'
import type { BasesSearchResultListItem } from '@app/web/server/search/executeSearch'
import { getDepartmentName } from '@app/web/utils/departments'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './BaseCard.module.css'

const BaseCard = ({
  base,
  user,
  className,
  compact = false,
  titleAs: BaseTitle = 'h2',
}: {
  base: BasesSearchResultListItem | BaseProfileListItem
  user: SessionUser | null
  className?: string
  compact?: boolean
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}) => (
  <article
    className={classNames(styles.container, className)}
    data-testid="base-card"
  >
    <Link href={`/bases/${base.slug}`} className={styles.imageLink}>
      <BaseImage base={base} size={compact ? 48 : 96} />
    </Link>
    <div className={styles.content}>
      <Link href={`/bases/${base.slug}`}>
        <BaseTitle className="fr-mb-0 fr-h6">{base.title}</BaseTitle>
      </Link>
      <div className={styles.midContent}>
        {!compact && !!base.excerpt && (
          <Link
            href={`/bases/${base.slug}`}
            className={classNames(
              'fr-mb-0 fr-mt-3v fr-text--sm',
              styles.exerpt,
            )}
          >
            {base.excerpt}
          </Link>
        )}
        {!compact && base.department && (
          <p className="fr-text--sm fr-text-mention--grey fr-mb-0 fr-mt-3v">
            <span
              className={classNames(
                styles.icon,
                'fr-icon-map-pin-2-line fr-icon--sm',
              )}
            />
            {getDepartmentName(base.department)}
          </p>
        )}
      </div>
      <BaseMetadata
        user={null}
        className={classNames(
          compact ? 'fr-mt-2v' : 'fr-mt-3v fr-mt-md-4v',
          'fr-text-mention--grey',
        )}
        base={{
          ...base,
          followedByData: null,
          _count: {
            ...base._count,
          },
        }}
        withBadge={!base.isPublic}
        smallBadge
        context="card"
      />
    </div>
    <div>
      <FollowButton base={base} user={user} />
    </div>
  </article>
)

export default BaseCard
