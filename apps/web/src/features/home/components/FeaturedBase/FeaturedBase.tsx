import type { SessionUser } from '@app/web/auth/sessionUser'
import BaseImage from '@app/web/components/BaseImage'
import type { BaseProfileListItem } from '@app/web/server/bases/getBasesList'
import { getDepartmentName } from '@app/web/utils/departments'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './FeaturedBase.module.css'

export const FeaturedBase = ({
  base: { id, slug, title, excerpt, department, image, _count },
}: {
  base: BaseProfileListItem
  user: SessionUser | null
}) => (
  <>
    <div className="fr-mb-2w fr-enlarge-link fr-no-hover-bg">
      <Link href={`/bases/${slug}`}>
        <BaseImage base={{ id, image }} size={96} />
      </Link>
      <h3 className="fr-text--lg fr-my-3v">{title}</h3>
      {!!department && (
        <p className="fr-text--sm fr-text-mention--grey fr-my-3v fr-flex fr-flex-gap-1v">
          <span className="ri-map-pin-2-line" />
          {getDepartmentName(department)}
        </p>
      )}
      {!!excerpt && (
        <div className={classNames('fr-text--sm fr-my-3v', styles.exerpt)}>
          {excerpt}
        </div>
      )}
      <div className="fr-text--sm fr-mb-0 fr-text-mention--grey fr-flex fr-flex-gap-2v">
        <span className="ri-file-text-line" />
        <b>{_count.resources}</b>·
        <span className="ri-user-heart-line" />
        <b>{_count.followedBy}</b>
      </div>
    </div>
    {/* <FollowBaseButton */}
    {/*  userId={user?.id} */}
    {/*  id={id} */}
    {/*  followedBy={follows} */}
    {/*  title={title} */}
    {/* /> */}
  </>
)
